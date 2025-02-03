import { z } from "zod";

export const productValidation = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .trim(),
  brand: z
    .string()
    .min(2, { message: "Brand must be at least 2 characters" })
    .trim(),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters" })
    .trim(),
  price: z
    .string()
    .trim()
    .nonempty({ message: "Price is required" })
    .transform((value) => Number(value)),
  gender: z.enum(["men", "women", "unisex"]),
  stock: z
    .string()
    .trim()
    .nonempty({ message: "Stock is required" })
    .transform((value) => Number(value)),
  discount: z
    .string()
    .trim()
    .optional()
    .transform((value) => {
      if (value === "") {
        return 0;
      } else {
        return Number(value);
      }
    }),
  isFeatured: z.enum(["true", "false"]).transform((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
  }),
  isLive: z.enum(["true", "false"]).transform((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
  }),
});

export type productValidationState =
  | {
      errors?: {
        title: string[];
        description: string[];
        brand: string[];
        category: string[];
        price: string[];
        gender: string[];
        stock: string[];
        discount: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
