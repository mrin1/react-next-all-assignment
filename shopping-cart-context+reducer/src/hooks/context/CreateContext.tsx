import { createContext } from "react";
//import { type ProductType, type  CartAction } from "../reducer/cartReducer";
//import type { CartItem } from "../../typescript/types/cartTypes";


import type { CartContextType } from "../../typescript/interface/interface";



export const CartContext = createContext<CartContextType | undefined>(undefined);