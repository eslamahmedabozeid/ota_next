import { z } from "zod";
import { TFunction } from "i18next";

export const ActivitiesSchema = (t: TFunction) =>
  z
    .object({
      title: z.object({
        en: z.string().min(1, { message: t("validations.title.en.required") }),
        ar: z.string().min(1, { message: t("validations.title.ar.required") }),
      }),
      lat: z
        .number({ invalid_type_error: t("validations.lat.invalid") })
        .or(z.string().regex(/^-?\d+(\.\d+)?$/, { message: t("validations.lat.invalid") }).transform(Number)),
      lng: z
        .number({ invalid_type_error: t("validations.lng.invalid") })
        .or(z.string().regex(/^-?\d+(\.\d+)?$/, { message: t("validations.lng.invalid") }).transform(Number)),

      image: z.any().optional(),
    })
    .transform((data) => ({
      ...data,
    }));
