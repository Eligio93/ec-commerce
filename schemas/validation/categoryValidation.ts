import { z } from "zod";
export const categoryValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .trim()
    .min(2, { message: "Description must be at least 2 characters" }),
  isFeatured: z.enum(["true", "false"]).transform((value) => {
    if (value === "true") return true;
    if (value === "false") return false;
  }),
  image: z.union([
    z.instanceof(File, { message: "Please uplaod one Image" }),
    z.string().trim(),
  ]),
});

export type categoryValidationState =
  | {
      errors?: {
        name: string[];
        description: string[];
        image: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
