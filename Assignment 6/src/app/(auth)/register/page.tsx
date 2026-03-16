"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { yupResolver } from "@hookform/resolvers/yup";
import { ShoppingBag, User, Mail, Phone, Lock, Camera } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/zustand/useAuth";
import { toast } from "sonner";
import { registerSchema } from "@/services/validation/validation";
import { RegisterFormValues } from "@/typescript/types/type";



const Register = () => {
  const router = useRouter();
  const { loading, registerUser } = useAuthStore();
  const [preview, setPreview] = useState<string>("");

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const response = await registerUser(data);
      if (response?.success) {
        router.push("/login");
        toast.success("Account Created Successfully")
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center p-6 overflow-hidden">
      
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-lg bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-10 pb-2 flex flex-col items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
            <ShoppingBag className="text-white w-7 h-7" />
          </div>
          <CardTitle className="text-3xl font-black tracking-tighter text-white uppercase italic text-center">
            Create <span className="text-blue-500">Account</span>
          </CardTitle>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">Join the product store</p>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-5 pt-6">
            
            <div className="flex flex-col items-center gap-4 mb-4">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-white/5 relative">
                  {preview ? (
                    <Image src={preview} alt="preview" fill className="object-cover" />
                  ) : (
                    <Camera className="text-slate-500 w-8 h-8" />
                  )}
                </div>
                <Label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-500 transition-colors shadow-lg">
                  <PlusIcon className="w-4 h-4 text-white" />
                  <Input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setValue("image", file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300 ml-1 text-[10px] font-bold uppercase tracking-widest">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    placeholder=""
                    {...register("name")}
                    className={`bg-white/5 border-white/10 text-white pl-10 h-11 rounded-xl focus:ring-blue-500/50 ${errors.name ? "border-red-500/50" : ""}`}
                  />
                </div>
                {errors.name && <p className="text-[10px] font-bold text-red-400 ml-1 uppercase">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300 ml-1 text-[10px] font-bold uppercase tracking-widest">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                  <Input
                    placeholder=""
                    {...register("phone")}
                    className={`bg-white/5 border-white/10 text-white pl-10 h-11 rounded-xl focus:ring-blue-500/50 ${errors.phone ? "border-red-500/50" : ""}`}
                  />
                </div>
                {errors.phone && <p className="text-[10px] font-bold text-red-400 ml-1 uppercase">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 ml-1 text-[10px] font-bold uppercase tracking-widest">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  type="email"
                  placeholder=""
                  {...register("email")}
                  className={`bg-white/5 border-white/10 text-white pl-10 h-11 rounded-xl focus:ring-blue-500/50 ${errors.email ? "border-red-500/50" : ""}`}
                />
              </div>
              {errors.email && <p className="text-[10px] font-bold text-red-400 ml-1 uppercase">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300 ml-1 text-[10px] font-bold uppercase tracking-widest">Security Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`bg-white/5 border-white/10 text-white pl-10 h-11 rounded-xl focus:ring-blue-500/50 ${errors.password ? "border-red-500/50" : ""}`}
                />
              </div>
              {errors.password && <p className="text-[10px] font-bold text-red-400 ml-1 uppercase">{errors.password.message}</p>}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pb-10">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all" 
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
            
            <div className="text-xs text-center font-bold tracking-widest uppercase text-slate-500">
              Already a member?{" "}
              <button 
                type="button" 
                onClick={() => router.push("/login")}
                className="text-blue-500 hover:text-blue-400 underline underline-offset-4 transition-colors"
              >
                Login here
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

function PlusIcon(props: any) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
    </svg>
  );
}

export default Register;