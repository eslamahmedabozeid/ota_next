import { TFunction } from "i18next";
import { z } from "zod";

export const LevelsSchema = (
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
        .min(1, { message: t("validations.name_ar.required") }),
    }),
    active: z.string(),

  });
};
