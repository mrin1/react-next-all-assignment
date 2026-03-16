import { createContext, useContext } from "react";
import type { FormContextType} from "../typescript/interface/interface";

export const FormContext = createContext<FormContextType | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used inside FormProvider");
  }
  return context;
}
