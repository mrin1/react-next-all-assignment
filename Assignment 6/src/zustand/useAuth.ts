import { supabase } from "@/lib/supabaseClient";
import { create } from "zustand";
import { setCookie, deleteCookie } from "cookies-next";

type AuthState = {
  loading: boolean;
  error: string | null;
  token: string | null;
  user: any | null;
  role: string | null;
  success: boolean;
  registerUser: (data: any) => Promise<any>;
  loginUser: (data: any) => Promise<any>;
  logOutUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  loading: false,
  error: null,
  token: null,
  user: null,
  role: null,
  success: false,

  registerUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: authData, error: accCreateError } =
        await supabase.auth.signUp({
          email: data.email,
          password: data.password,
        });

      if (accCreateError) throw accCreateError;
      const userId = authData.user?.id;

      let imageURL: string | null = null;
      if (data.image && userId) {
        const fileExt = data.image.name.split(".").pop();
        const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("registration-image")
          .upload(fileName, data.image);

        if (uploadError) throw uploadError;

        const { data: imageData } = supabase.storage
          .from("registration-image")
          .getPublicUrl(fileName);

        imageURL = imageData.publicUrl;
      }

      const { error: registrationError } = await supabase
        .from("registrations")
        .insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          role: "user",
          image: imageURL,
          auth_user_id: userId,
        });

      if (registrationError) throw registrationError;

      set({ success: true });
      return { success: true, message: "Registration Successful" };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, message: error.message };
    } finally {
      set({ loading: false });
    }
  },

  loginUser: async (data) => {
    set({ loading: true, error: null });
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (authError) throw authError;

      const { data: profile, error: profileError } = await supabase
        .from("registrations")
        .select("*")
        .eq("auth_user_id", authData.user.id)
        .single();

      if (profileError) throw profileError;

      const cookieOptions = { maxAge: 60 * 60 * 24 * 7, path: "/" };
      setCookie("token", authData.session.access_token, cookieOptions);
      setCookie("role", profile.role, cookieOptions);
      setCookie("user", JSON.stringify(profile), cookieOptions);

      set({
        token: authData.session.access_token,
        user: profile,
        role: profile.role,
        success: true,
      });

      return { success: true, message: "Login Successful" };
    } catch (error: any) {
      set({ error: error.message });
      return { success: false, message: error.message };
    } finally {
      set({ loading: false });
    }
  },

  logOutUser: async () => {
    try {
      await supabase.auth.signOut();

      deleteCookie("token");
      deleteCookie("role");
      deleteCookie("user");

      set({
        token: null,
        user: null,
        role: null,
        success: false,
        error: null,
      });

      window.location.href = "/";
    } catch (err: any) {
      console.error("Logout Error:", err.message);
    }
  },
}));
