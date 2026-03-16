import { supabase } from "@/lib/supabaseClient";
import { ProductState } from "@/typescript/types/type";
import { create } from "zustand";



export const useProductStore = create<ProductState>((set, get) => ({
  product: [],
  loading: false,
  error: null,
  success: false,

  productList: async () => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: false });

      if (error) throw error;

      set({ product: data || [], loading: false });
      return data;
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return [];
    }
  },

  addProduct: async (data: any) => {
    set({ loading: true, success: false, error: null });
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not authenticated");

      let imageURL = data.image;

      if (data.image && typeof data.image !== "string") {
        const fileExt = data.image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("product-image")
          .upload(fileName, data.image);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("product-image")
          .getPublicUrl(fileName);

        imageURL = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("products").insert({
        name: data.name,
        price: data.price,
        image: imageURL,
        auth_user_id: userData.user.id,
      });

      if (insertError) throw insertError;

      await get().productList();
      set({ loading: false, success: true });
      return { success: true, message: "Product added successfully" };
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },

  deleteProduct: async (id: number) => {
    set({ loading: true, success: false, error: null });
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      await get().productList();

      set({ loading: false, success: true });
      return { success: true, message: "Product deleted successfully" };
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },

  updateProduct: async ({ id, data }: { id: number; data: any }) => {
    set({ loading: true, success: false, error: null });
    try {
      let imageURL = data.image;

      if (data.image && typeof data.image !== "string") {
        const fileExt = data.image.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadErr } = await supabase.storage
          .from("product-image")
          .upload(fileName, data.image);

        if (uploadErr) throw uploadErr;
        imageURL = supabase.storage.from("product-image").getPublicUrl(fileName)
          .data.publicUrl;
      }

      const { error: updateError } = await supabase
        .from("products")
        .update({
          name: data.name,
          price: data.price,
          image: imageURL,
        })
        .eq("id", id);

      if (updateError) throw updateError;

      await get().productList();
      set({ loading: false, success: true });
      return { success: true, message: "Product updated successfully" };
    } catch (error: any) {
      set({ loading: false, error: error.message });
      return { success: false, message: error.message };
    }
  },
}));
