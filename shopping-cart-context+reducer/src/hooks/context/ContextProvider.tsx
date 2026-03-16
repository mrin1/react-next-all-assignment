// src/hooks/context/ContextProvider.tsx
import React, { useReducer, useMemo } from "react";
import CartReducer, { totalItem, totalPrice } from "../reducer/cartReducer";
import { CartContext } from "./CreateContext";
import type { ProductType } from "../../typescript/interface/interface";

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(CartReducer, []);

  const addItem = (product: ProductType) => dispatch({ type: "Add", product });
  const removeItem = (id: number) => dispatch({ type: "Remove", id });
  const increaseQty = (id: number) => dispatch({ type: "Increase", id });
  const decreaseQty = (id: number) => dispatch({ type: "Decrease", id });


  const cartTotal = useMemo(() => totalPrice(cart), [cart]);
  const cartCount = useMemo(() => totalItem(cart), [cart]);

  const value = {
    cart,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    cartTotal,
    cartCount
  };

  return(
    <CartContext.Provider value={value}>
    {children}
    </CartContext.Provider>
  ) 
};