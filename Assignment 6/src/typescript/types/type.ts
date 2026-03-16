 export type LoginFormValues = {
  email: string;
  password: string;
};


export type RegisterFormValues = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role?: string;
  auth_user_id?: string;
  image?: File | null;
};

export type ProductState = {
  product: any[];
  loading: boolean;
  error: string | null;
  success: boolean;
  productList: () => Promise<any>;
  addProduct: (data: any) => Promise<any>;
  deleteProduct: (id: number) => Promise<any>;
  updateProduct: ({ id, data }: { id: number; data: any }) => Promise<any>;
};