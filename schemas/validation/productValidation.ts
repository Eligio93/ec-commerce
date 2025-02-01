import { z } from "zod";

export const productValidation = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(20, { message: "Title must be at most 15 characters" })
    .trim(),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(100, { message: "Description must be at most 15 characters" })
    .trim(),
  brand: z
    .string()
    .min(2, { message: "Brand must be at least 2 characters" })
    .max(15, { message: "Brand must be at most 15 characters" })
    .trim(),
  category: z
    .string()
    .min(2, { message: "Category must be at least 2 characters" })
    .max(15, { message: "Category must be at most 15 characters" })
    .trim(),
  price: z
    .number()
    .gt(0, { message: "Price must be greater than 0" })
    .finite()
    .positive(),
  gender: z.enum(["men", "women", "unisex"]),
  stock: z
    .number()
    .gt(0, { message: "Price must be greater than 0" })
    .finite()
    .positive(),
  discount: z
    .number()
    .gt(0, { message: "Price must be greater than 0" })
    .lte(100, { message: "Max discount applicable is 100" })
    .finite()
    .positive(),
  isFeatured: z.boolean(),
  isLive: z.boolean(),
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
