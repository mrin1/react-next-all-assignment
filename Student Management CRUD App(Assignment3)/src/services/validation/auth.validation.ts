import * as yup from "yup";
// Yup Schema
export const SignupYupValidation = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Minimum 3 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
    profileImage: yup.mixed().optional()
});


export const LoginYupValidation  = yup.object({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});