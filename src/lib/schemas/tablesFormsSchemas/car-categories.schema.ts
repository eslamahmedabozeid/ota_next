import { z } from "zod";
import { TFunction } from "i18next";

export const CarCategorySchema = (t: TFunction) =>
  z.object({
    title: z.object({
      en: z.string().min(1, { message: t("validations.name.en.required") }),
      ar: z.string().min(1, { message: t("validations.name.ar.required") }),
    }),
    icon: z.any({
      required_error: t("validations.icon.required"),
    }),
    active: z.boolean().default(true),
  });
