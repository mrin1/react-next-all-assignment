// src/Features/CartReducer.ts
import type { ProductType } from "../../typescript/interface/interface";
import type { CartAction } from "../../typescript/types/cartAction";

export const totalItem = (cart: ProductType[]): number => {
  return cart.reduce((sum, product) => sum + (product.quantity || 0), 0);
};

export const totalPrice = (cart: ProductType[]): number => {
  return cart.reduce(
    (total, product) => total + (product.quantity || 0) * product.price,
    0
  );
};

const CartReducer = (
  state: ProductType[],
  action: CartAction
): ProductType[] => {
  switch (action.type) {
    case "Add": {
      const existingProduct = state.find((p) => p.id === action.product.id);

      if (existingProduct) {
        return state.map((p) =>
          p.id === action.product.id
            ? {
              ...p,
              quantity: (p.quantity || 0) + (action.product.quantity || 1),
            }
            : p
        );
      }
      return [
        ...state,
        { ...action.product, quantity: action.product.quantity || 1 },
      ];
    }

    case "Remove":
      return state.filter((p) => p.id !== action.id);

    case "Increase":
      return state.map((p) =>
        p.id === action.id ? { ...p, quantity: (p.quantity || 0) + 1 } : p
      );

    case "Decrease":
      return state.map((p) =>
        p.id === action.id && (p.quantity || 0) > 1
          ? { ...p, quantity: (p.quantity || 0) - 1 }
          : p
      );

    default:
      return state;
  }
};

export default CartReducer;
