import { TFunction } from "i18next";
import { z } from "zod";

export const FaqsSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    title: z.object({
    en: z.string().min(1, "English title is required"),
    ar: z.string().min(1, "Arabic title is required"),
  }),
  active: z.boolean().optional(),
  });
};
