import * as yup from "yup";

const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,15}$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const fullnameSchema = yup
  .string()
  .required("Please enter your full name.")
  .min(4, "Full name must be at least 3 characters.")
  .max(20, "Full name must be at most 50 characters.");

const usernameSchema = yup
  .string()
  .required("Please enter your username.")
  .min(3, "Username must be at least 3 characters.")
  .max(15, "Username must be at most 15 characters.")
  .matches(
    USERNAME_REGEX,
    "Invalid username. Must start with a letter and be 3-15 characters long. " +
      "Can contain letters, numbers, hyphens, and underscores."
  );

const passwordSchema = yup
  .string()
  .nullable(false)
  .transform((value) => (value.trim() === "" ? null : value))
  .min(8, "Password must be at least 8 characters.")
  .max(24, "Password must be at most 24 characters.")
  .matches(
    PASSWORD_REGEX,
    "Password must be between 8 and 24 characters. Must contain at " +
      "least one uppercase letter, one lowercase letter, one digit, and " +
      "one special character: ! @ # $ %."
  );

const requiredPasswordSchema = passwordSchema.required(
  "Please enter your password."
);

const confirmPasswordSchema = yup
  .string()
  .transform((value) => (value?.trim() === "" ? null : value))
  .when("password", {
    is: (password) => password && password.length > 0,
    then: (schema) =>
      schema
        .required("Passwords must match")
        .oneOf([yup.ref("password")], "Passwords must match"),
    otherwise: (schema) => schema.notRequired().nullable(),
  });

const emailSchema = yup
  .string()
  .required("Please enter your email.")
  .email("Please enter a valid email.");

const expirationDateSchema = yup
  .date()
  .required("Please select an expiration date.")
  .min(new Date(), "Expiration date must be in the future.");

const statusSchema = yup
  .string()
  .notOneOf(["0"], "Please select a status.")
  .required("Please select a status.");

const roleSchema = yup
  .string()
  .notOneOf(["0"], "Please select a role.")
  .required("Please select a role.");

const titleSchema = yup
  .string()
  .notOneOf(["0"], "Please select a title.")
  .required("Please select a title.");

export const updateUser = yup.object({
  fullname: fullnameSchema.notRequired(),
  username: usernameSchema.notRequired(),
  password: passwordSchema.notRequired(),
  confirmPassword: confirmPasswordSchema.notRequired(),
  email: emailSchema.notRequired(),
  expirationDate: expirationDateSchema.notRequired(),
  status: statusSchema.notRequired(),
  userRole: roleSchema.notRequired(),
  userTitle: titleSchema.notRequired(),
});

export const createUser = yup.object({
  fullname: fullnameSchema.required("Please enter your full name."),
  username: usernameSchema.required("Please enter your username."),
  password: requiredPasswordSchema.required("Please enter your password."),
  confirmPassword: confirmPasswordSchema.required(
    "Please confirm your password."
  ),
  email: emailSchema.required("Please enter your email."),
  role: roleSchema.required("Please select a role."),
  title: titleSchema.required("Please select a title."),
  status: statusSchema.required("Please select a status."),
});
