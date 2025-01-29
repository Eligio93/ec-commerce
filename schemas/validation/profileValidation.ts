import { z } from "zod";

export const profileValidation = z.object({
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
});

export type profileValidationState =
  | {
      errors?: {
        name?: string[];
        lastName?: string[];
        email?: string[];
        oldPassword?: string[];
        newPassword?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
