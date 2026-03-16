import { useReducer } from "react";
import { FormContext } from "./FormContext";
import { formReducer, initialFormState } from "../reducer/formReducer";
import type { FormData } from "../typescript/interface/interface";

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  const updatePersonalInfo = (data: Partial<FormData["personalInfo"]>) => {
    dispatch({ type: "UPDATE_PERSONAL_INFO", payload: data });
  };

  const updateAddressInfo = (data: Partial<FormData["addressInfo"]>) => {
    dispatch({ type: "UPDATE_ADDRESS_INFO", payload: data });
  };

  const updatePreferences = (data: Partial<FormData["preferences"]>) => {
    dispatch({ type: "UPDATE_PREFERENCES", payload: data });
  };

  const resetForm = () => {
    dispatch({ type: "RESET_FORM" });
  };

  return (
    <FormContext.Provider
      value={{
        state,
        updatePersonalInfo,
        updateAddressInfo,
        updatePreferences,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
}
