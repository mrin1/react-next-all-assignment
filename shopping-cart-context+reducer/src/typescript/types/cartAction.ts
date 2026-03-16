import type { ProductType } from "../interface/interface";

export type CartAction =
  | { type: "Add"; product: ProductType }
  | { type: "Remove"; id: number }
  | { type: "Increase"; id: number }
  | { type: "Decrease"; id: number };
