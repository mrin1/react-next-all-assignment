"use client";

import  { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Edit,
  Loader2,
  Trash,
  Plus,
  Package,
  DollarSign,
  Image as ImageIcon,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useProductStore } from "@/zustand/useProduct";
import { useAuthStore } from "@/zustand/useAuth";
import { ProductFormValues } from "@/typescript/interface/interface";
import { productSchema } from "@/services/validation/validation";

const Products = () => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [isEditId, setIsEditId] = useState<number | null>(null);

  const {
    loading,
    product,
    productList,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProductStore();
  const { logOutUser } = useAuthStore();
  useEffect(() => {
    productList();
  }, [productList]);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: yupResolver(productSchema) as any,
    defaultValues: { name: "", price: undefined, image: null },
  });

  const handleLogout = async () => {
    try {
      await logOutUser();
      toast.success("Logout Successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditId(null);
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(null);
    reset({ name: "", price: undefined, image: null });
  };

  const onSubmit = async (data: ProductFormValues) => {
    try {
      let response = isEditId
        ? await updateProduct({ id: isEditId, data })
        : await addProduct(data);
      if (response?.success) {
        toast.success(response.message);
        handleClose();
      } else {
        toast.error(response?.message || "Operation failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await deleteProduct(id);
      if (response.success)
        toast.success(response.message || "Delete Successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] p-4 md:p-8 overflow-hidden text-slate-200">
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-5%] left-[-5%] w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:row md:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-[2rem] shadow-2xl">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic uppercase flex items-center gap-3">
              <Package className="text-blue-500" /> Inventory{" "}
              <span className="text-blue-500">Hub</span>
            </h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
              Manage your premium product list
            </p>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold px-6 py-6 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="mr-2 h-5 w-5" /> ADD NEW PRODUCT
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="rounded-xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all gap-2"
          >
            <LogOut size={16} /> Logout
          </Button>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  Visual
                </TableHead>
                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  Product Details
                </TableHead>
                <TableHead className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  Price Tag
                </TableHead>
                <TableHead className="text-right text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading && product?.length === 0 ? (
                <TableRow className="border-transparent">
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                      <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                        Loading database...
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : product?.length === 0 ? (
                <TableRow className="border-transparent">
                  <TableCell colSpan={4} className="h-64 text-center">
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm italic">
                      No products in storage.
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                product.map((item: any) => (
                  <TableRow
                    key={item.id}
                    className="border-white/5 hover:bg-white/[0.02] transition-colors"
                  >
                    <TableCell>
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-inner">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ImageIcon className="absolute inset-0 m-auto text-slate-700 w-6 h-6" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-bold text-lg text-white tracking-tight">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-blue-500 font-black uppercase">
                        Active Listing
                      </p>
                    </TableCell>
                    <TableCell>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black">
                        <DollarSign size={14} className="mr-0.5" /> {item.price}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 border border-transparent hover:border-blue-500/20"
                        onClick={() => {
                          setIsEditId(item.id);
                          reset({
                            name: item.name,
                            price: item.price,
                            image: item.image,
                          });
                          setPreview(item.image || null);
                          setOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-500 border border-transparent hover:border-red-500/20"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
        <DialogContent className="bg-[#0f172a]/95 backdrop-blur-3xl border-white/10 text-white rounded-[2rem] max-w-md shadow-2xl shadow-blue-900/20">
          <DialogHeader className="items-center">
            <div className="bg-blue-600/20 p-3 rounded-2xl mb-2">
              <Package className="text-blue-500 w-6 h-6" />
            </div>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter">
              {isEditId ? "Update" : "Create"}{" "}
              <span className="text-blue-500">Product</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 font-medium text-center">
              Enter the specific details for your inventory item.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Product Identity
                </Label>
                <Input
                  {...register("name")}
                  placeholder="Modern Sneakers..."
                  className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/50"
                />
                {errors.name?.message && (
                  <p className="text-[10px] font-bold text-red-400 uppercase ml-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  Market Price
                </Label>
                <Input
                  type="number"
                  {...register("price")}
                  placeholder="0.00"
                  className="bg-white/5 border-white/10 rounded-xl h-12 text-white placeholder:text-slate-600 focus:ring-blue-500/50"
                />
                {errors.price?.message && (
                  <p className="text-[10px] font-bold text-red-400 uppercase ml-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/5 border-dashed">
                <div className="relative w-28 h-28 bg-black/20 rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                  {preview ? (
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover unoptimized"
                    />
                  ) : (
                    <ImageIcon className="text-slate-700 w-10 h-10" />
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-transparent border-none text-xs file:bg-blue-600 file:text-white file:border-none file:rounded-lg file:px-3 file:py-1 file:mr-4 file:cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setValue("image", file);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </div>
            </div>

            <DialogFooter className="sm:justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 h-12 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-blue-500/20"
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditId ? "CONFIRM UPDATE" : "SAVE TO INVENTORY"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
