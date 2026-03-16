import * as yup from "yup";
export const StudentYupValidation = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(3, "Minimum 3 characters"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  course: yup
    .string()
    .required("Course is required"),
    profileImage: yup.mixed().optional()
});