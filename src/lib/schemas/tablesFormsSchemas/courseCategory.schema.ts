import { TFunction } from "i18next";
import { Target } from "lucide-react";
import { z } from "zod";
import { validateFile } from "../common-rules";

export const CourseCategoriesSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.name_en.required") })
        ,
      ar: z
        .string()
        .min(1, { message: t("validations.name_ar.required") })
        ,
    }),
    active: z.string(),
    is_featured:  z.string(),
    target: z.string().min(1, { message: t("validations.target.required") }),
    type: z.string().min(1, { message: t("validations.type.required") }),
    
  });
};
