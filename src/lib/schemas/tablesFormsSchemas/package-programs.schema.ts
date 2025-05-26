import { z } from "zod";
import { TFunction } from "i18next";

export const PackagesProgramsSchema = (t: TFunction) =>
  z.object({
    title: z.object({
      en: z.string().min(1, { message: t("validations.title.en.required") }),
      ar: z.string().min(1, { message: t("validations.title.ar.required") }),
    }),
    description: z.object({
      en: z.string().min(1, { message: t("validations.description.en.required") }),
      ar: z.string().min(1, { message: t("validations.description.ar.required") }),
    }),
    package_id: z.coerce.number().min(1, { message: t("validations.package.required") }),
    lat: z.number({ invalid_type_error: t("validations.lat.required") }),
    lng: z.number({ invalid_type_error: t("validations.lng.required") }),
    order_number: z.number().optional(),
    image: z.any().optional(),
  });
