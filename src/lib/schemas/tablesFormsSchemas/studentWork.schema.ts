import { z } from "zod";
import { TFunction } from "i18next";
import { validateFile } from "../common-rules";
import { REGEX } from "@/constants";

export const StudentWorkSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    category_id: z
      .union([
        z.string().min(1, { message: t("validations.category.required") }),
        z.number({ message: t("validations.category.required") }),
      ]),


       image: z
        .union([
          z.string(),
          z.literal(""),
          z.null(),
          z.array(z.string()),
        ])
        .optional(),
    active: z.string().min(1, { message: t("validations.active.required") }),

    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.title_en.required") })
        ,
      ar: z
        .string()
        .min(1, { message: t("validations.title_ar.required") })
        ,
    }),

    
    


  });
};
