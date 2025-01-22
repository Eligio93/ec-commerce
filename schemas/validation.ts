import { z } from "zod";

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name must be at most 15 characters" })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" })
    .max(30, { message: "Last Name must be at most 30 characters" })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    // .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    // .regex(/[0-9]/, { message: "Contain at least one number." })
    // .regex(/[^a-zA-Z0-9]/, {
    //   message: "Contain at least one special character.",
    // })
    .trim(),
});

export type AuthFormState =
  | {
      errors?: {
        name?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const EditAccountSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(15, { message: "Name must be at most 15 characters" })
    .trim(),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters" })
    .max(30, { message: "Last Name must be at most 30 characters" })
    .trim(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .trim(),
  password: z.string().trim().optional(), // this is one is coming for validation in the form of encoded by bcrypt
  oldPassword: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .optional(),
  newPassword: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .optional(),
  country: z.string().trim().optional(),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 character" })
    .optional(),
  zipCode: z
    .string()
    .min(2, { message: "ZipCode must be at least 2 character long" })
    .optional(),
  streetLine1: z
    .string()
    .min(2, { message: "Please Enter a valid street Name" })
    .optional(),
  streetLine2: z
    .string()
    .min(2, { message: "Please Enter a valid street Name" })
    .optional(),
});
export type ProfileFormState =
  | {
      errors?: {
        name?: string[];
        lastName?: string[];
        email?: string[];
        oldPassword?: string[];
        newPassword?: string[];
        city?: string[];
        zipCode?: string[];
        streetLine1?: string[];
        streetLine2?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
