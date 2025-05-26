import { z } from "zod";
import { TFunction } from "i18next";

export const ServiceSchema = (t: TFunction) => {
  return z.object({
    title: z.object({
      en: z.string().min(1, { message: t("validations.title.en.required") }),
      ar: z.string().min(1, { message: t("validations.title.ar.required") }),
    }),
    description: z.object({
      en: z.string().min(1, { message: t("validations.description.en.required") }),
      ar: z.string().min(1, { message: t("validations.description.ar.required") }),
    }),
    image: z.string().optional(),
    order_number: z
      .number({ invalid_type_error: t("validations.order_number.invalid") })
      .min(0, { message: t("validations.order_number.min") }),
    is_active: z.boolean().default(true),
  });
};
