export interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  addressInfo: {
    street: string;
    city: string;
    zipCode: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    theme: "light" | "dark";
  };
}

export interface FormContextType {
  state: FormData;

  updatePersonalInfo: (data: Partial<FormData["personalInfo"]>) => void;
  updateAddressInfo: (data: Partial<FormData["addressInfo"]>) => void;
  updatePreferences: (data: Partial<FormData["preferences"]>) => void;

  resetForm: () => void;
}
