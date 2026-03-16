"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { ShoppingBag, Lock, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuthStore } from "@/zustand/useAuth";
import { toast } from "sonner";
import { loginSchema } from "@/services/validation/validation";
import { LoginFormValues } from "@/typescript/types/type";




const Login = () => {
  const router = useRouter();
  const { loading, loginUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await loginUser(data);
      if (response?.success) {
        router.push("/admin/product");
        toast.success("Login Successfully")
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login Failed")
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] flex items-center justify-center p-4 overflow-hidden">
      
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md bg-white/5 backdrop-blur-2xl border-white/10 shadow-2xl rounded-[2.5rem] overflow-hidden">
        <CardHeader className="pt-10 pb-2">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
              <ShoppingBag className="text-white w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-black tracking-tighter text-white uppercase italic">
              Welcome <span className="text-blue-500">Back</span>
            </CardTitle>
            <p className="text-slate-400 text-sm font-medium">Enter your credentials to continue</p>
          </div>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-300 ml-1 text-xs font-bold uppercase tracking-widest">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  {...register("email")}
                  className={`bg-white/5 border-white/10 text-white pl-10 h-12 rounded-xl focus:ring-blue-500/50 transition-all ${
                    errors.email ? "border-red-500/50" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-tight ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-slate-300 ml-1 text-xs font-bold uppercase tracking-widest">
                Secret Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`bg-white/5 border-white/10 text-white pl-10 h-12 rounded-xl focus:ring-blue-500/50 transition-all ${
                    errors.password ? "border-red-500/50" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-tight ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-6 pb-10">
            <Button 
              type="submit" 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-95" 
              disabled={loading}
            >
              {loading ? "Loading..." : "LOGIN TO STORE"}
            </Button>

            <div className="text-xs text-center font-bold tracking-widest uppercase text-slate-500">
              New to the platform?{" "}
              <button
                type="button"
                onClick={() => router.push("/register")}
                className="text-blue-500 hover:text-blue-400 underline underline-offset-4 transition-colors"
              >
                Create Account
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;