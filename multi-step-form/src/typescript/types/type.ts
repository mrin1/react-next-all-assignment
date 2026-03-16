import type { FormData } from "../../typescript/interface/interface";

export type FormAction =
  | { type: "UPDATE_PERSONAL_INFO"; payload: Partial<FormData["personalInfo"]> }
  | { type: "UPDATE_ADDRESS_INFO"; payload: Partial<FormData["addressInfo"]> }
  | { type: "UPDATE_PREFERENCES"; payload: Partial<FormData["preferences"]> }
  | { type: "RESET_FORM" };
