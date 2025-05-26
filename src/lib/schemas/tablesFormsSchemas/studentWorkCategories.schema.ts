import { z } from "zod";
import { TFunction } from "i18next";
import { validateFile } from "../common-rules";
import { REGEX } from "@/constants";

export const StudentWorkCategoriesSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
          icon: z
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
          //  .regex(REGEX.ENGLISH_LETTERS, {
          //    message: t("validations.title_en.pattern"),
          //  })
           ,
         ar: z
           .string()
           .min(1, { message: t("validations.title_ar.required") })
          //  .regex(REGEX.ARABIC_LETTERS, {
          //    message: t("validations.title_ar.pattern"),
          //  })
           ,
       }),
  });
};
