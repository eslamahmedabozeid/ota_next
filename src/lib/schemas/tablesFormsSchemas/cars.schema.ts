import { z } from "zod";
import { TFunction } from "i18next";

export const CarsSchema = (t: TFunction) =>
  z.object({
    title: z.object({
      en: z.string().min(1, { message: t("validations.title.en.required") }),
      ar: z.string().min(1, { message: t("validations.title.ar.required") }),
    }),
    category_id: z.coerce.number().min(1, {
      message: t("validations.category.required"),
    }),
    seats_num: z.coerce.number().min(1, {
      message: t("validations.seats_num.required"),
    }),
    bags_num: z.coerce.number().min(0, {
      message: t("validations.bags_num.required"),
    }),
    price_per_day: z.coerce.number().positive({
      message: t("validations.price_per_day.invalid"),
    }),
    automatic: z.boolean().default(false),
    km_rental: z.boolean().default(false),
    active: z.boolean().default(true),
  });
