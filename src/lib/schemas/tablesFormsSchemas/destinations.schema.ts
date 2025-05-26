import { z } from "zod";
import { TFunction } from "i18next";

export const DistinationSchema = (t: TFunction) =>
  z
    .object({
      name: z.object({
        en: z.string().min(1, { message: t("validations.name.en.required") }),
        ar: z.string().min(1, { message: t("validations.name.ar.required") }),
      }),
      description: z.object({
        en: z.string().min(1, { message: t("validations.description.en.required") }),
        ar: z.string().min(1, { message: t("validations.description.ar.required") }),
      }),
      country: z.object({
        id: z
          .string({ required_error: t("validations.country.required") })
          .min(1, { message: t("validations.country.required") }),
      }),
      lat: z
        .number({ invalid_type_error: t("validations.lat.invalid") })
        .or(z.string().regex(/^-?\d+(\.\d+)?$/, { message: t("validations.lat.invalid") }).transform(Number)),
      lng: z
        .number({ invalid_type_error: t("validations.lng.invalid") })
        .or(z.string().regex(/^-?\d+(\.\d+)?$/, { message: t("validations.lng.invalid") }).transform(Number)),
      temperature: z
        .number({ invalid_type_error: t("validations.temperature.invalid") })
        .or(z.string().regex(/^-?\d+(\.\d+)?$/, { message: t("validations.temperature.invalid") }).transform(Number)),
      tags: z
        .object({
          en: z.array(z.string().min(1)).optional(),
          ar: z.array(z.string().min(1)).optional(),
        })
        .optional(),
      main_image: z.any().optional(),
      images: z.array(z.any()).optional(),
      active: z.boolean().default(true),
      is_featured: z.boolean().default(false),
    })
    .transform((data) => ({
      ...data,
      country_id: Number(data.country.id),
    }));
