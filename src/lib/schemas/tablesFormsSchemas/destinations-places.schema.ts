import { z } from "zod";
import { TFunction } from "i18next";

export const DistinationPlacesSchema = (t: TFunction) =>
   z
    .object({
      name: z.object({
        en: z.string().min(1, { message: t("validations.name.en.required") }),
        ar: z.string().min(1, { message: t("validations.name.ar.required") }),
      }),
      category: z.object({
  id: z
    .union([
      z.string().min(1, { message: t("validations.category.required") }),
      z.number({ invalid_type_error: t("validations.category.required") })
    ])
    .transform((val) => Number(val))
}),
city: z.object({
  id: z
    .union([
      z.string().min(1, { message: t("validations.city.required") }),
      z.number({ invalid_type_error: t("validations.city.required") })
    ])
    .transform((val) => Number(val))
}),
      active: z.boolean().default(true),

      image: z.any({
        required_error: t("validations.image.required")
      }),
      order_number: z
        .number({ invalid_type_error: t("validations.order_number.invalid") })
        .or(z.string().regex(/^\d+$/, { message: t("validations.order_number.invalid") }).transform(Number)),
      info_en: z
        .string()
        .min(1, { message: t("validations.info_en.required") }),
      info_ar: z
        .string()
        .min(1, { message: t("validations.info_ar.required") }),
    })
    .transform((data) => ({
      ...data,
      category_id: Number(data.category.id),
      city_id: Number(data.city.id),
    }));
