//import type { CartAction } from "../types/cartAction";

export interface ProductType {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface CartProductProps {
  product: Product;
}

export interface CartContextType {
  cart: ProductType[];
  addItem: (product: ProductType) => void;
  removeItem: (id: number) => void;
  increaseQty: (id: number) => void;
  decreaseQty: (id: number) => void;
  cartTotal: number;
  cartCount: number;
}

export interface ProductProps {
  product: ProductType;
}
