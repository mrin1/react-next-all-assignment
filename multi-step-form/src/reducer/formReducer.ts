import type { FormData,  } from "../typescript/interface/interface";
import type {FormAction}  from "../typescript/types/type"
export const initialFormState: FormData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
  },
  addressInfo: {
    street: "",
    city: "",
    zipCode: "",
  },
  preferences: {
    newsletter: false,
    notifications: true,
    theme: "dark",
  },
};

export function formReducer(
  currentState: FormData,
  action: FormAction,
): FormData {
  switch (action.type) {
    case "UPDATE_PERSONAL_INFO": {
      return {
        ...currentState,
        personalInfo: {
          ...currentState.personalInfo,
          ...action.payload,
        },
      };
    }

    case "UPDATE_ADDRESS_INFO": {
      return {
        ...currentState,
        addressInfo: {
          ...currentState.addressInfo,
          ...action.payload,
        },
      };
    }

    case "UPDATE_PREFERENCES": {
      return {
        ...currentState,
        preferences: {
          ...currentState.preferences,
          ...action.payload,
        },
      };
    }

    case "RESET_FORM": {
      return initialFormState;
    }

    default: {
      return currentState;
    }
  }
}
