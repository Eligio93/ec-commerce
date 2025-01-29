import { z } from "zod";

export const addressValidation = z.object({
  country: z.string().trim().nonempty({ message: "Please select a country" }),
  city: z
    .string()
    .min(2, { message: "City must be at least 2 characters" })
    .max(15, { message: "City must be at most 15 characters" })
    .trim(),
  zipCode: z
    .string()
    .min(2, { message: "ZipCode must be at least 2 characters" })
    .max(15, { message: "ZipCode must be at most 6 characters" })
    .trim(),
  streetLine1: z
    .string()
    .min(2, { message: "Street Line 1 must be at least 2 characters" })
    .max(15, { message: "Street Line 1 must be at most 50 characters" })
    .trim(),
  streetLine2: z
    .string()
    .min(2, { message: "Street Line 2 must be at least 2 characters" })
    .max(15, { message: "Street Line 2 must be at most 15 characters" })
    .trim()
    .optional(),
});

export type addressValidationState =
  | {
      errors?: {
        country?: string[];
        city?: string[];
        zipCode?: string[];
        streetLine1?: string[];
        streetLine2?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
