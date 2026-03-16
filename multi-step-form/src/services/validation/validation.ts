import * as Yup from "yup";

export const AddressYupValidation = Yup.object().shape({
  street: Yup.string()
    .required("Street name is required")
    .min(3, "Street name is too short"),
  city: Yup.string()
    .required("City is required"),
  zipCode: Yup.string()
    .required("ZIP code is required")
    .matches(/^[0-9]{5,6}$/, "Must be a valid ZIP code (5-6 digits)"),
});


export const PersonalInfoYupValidation = Yup.object().shape({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "Too short"),
  lastName: Yup.string()
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});