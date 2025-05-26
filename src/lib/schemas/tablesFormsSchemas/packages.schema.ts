import { z } from "zod";
import { TFunction } from "i18next";

export const PackagesSchema = (t: TFunction) =>
    z
    .object({
      title: z.object({
        en: z.string().min(1, { message: t("validations.title.en.required") }),
        ar: z.string().min(1, { message: t("validations.title.ar.required") }),
      }),
      description: z.object({
        en: z.string().min(1, { message: t("validations.description.en.required") }),
        ar: z.string().min(1, { message: t("validations.description.ar.required") }),
      }),
country_id: z.coerce.number().min(1, { message: t("validations.country.required") }),
city_id: z.coerce.number().min(1, { message: t("validations.city.required") }),
tour_id: z.coerce.number().min(1, { message: t("validations.tour.required") }),
category_id: z.coerce.number().min(1, { message: t("validations.category.required") }),
      type: z.enum(["package", "event"], {
  required_error: t("validations.type.required")
}),
      text_address: z.string().min(1, { message: t("validations.address.required") }),
      lat: z.number(),
      lng: z.number(),
  start_date: z.string().min(1, t("validations.start_data.invalid")),
  end_date: z.string().min(1, t("validations.end_data.invalid")),
      num_of_days: z.number(),
price_from: z.coerce.number()
  .positive({ message: t("validations.price.invalid") })
  .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
    message: t("validations.price.invalid"),
  }),

price_to: z.coerce.number()
  .positive({ message: t("validations.price.invalid") })
  .refine(val => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
    message: t("validations.price.invalid"),
  }),
      max_group_size: z.number(),
      min_group_size: z.number(),
      thumbnail_image: z.any(),
      images: z.array(z.any()).optional(),
      tags: z.object({
        en: z.array(z.string()),
        ar: z.array(z.string()),
      }).optional(),
      is_active: z.boolean().default(true),
      is_featured: z.boolean().default(false),
      include: z.string(),
      exclude: z.string(),
    });