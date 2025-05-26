import { TFunction } from "i18next";
import { z } from "zod";

export const BranchSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.name_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.name_ar.required") }),
    }),
    active: z.string(),
    is_featured: z.string(),
    lat: z
      .number({
        invalid_type_error: t("validations.latitude.required"),
        required_error: t("validations.latitude.required"),
      })
      .min(-90, { message: t("validations.latitude.range") })
      .max(90, { message: t("validations.latitude.range") }),
    lng: z
      .number({
        invalid_type_error: t("validations.longitude.required"),
        required_error: t("validations.longitude.required"),
      })
      .min(-180, { message: t("validations.longitude.range") })
      .max(180, { message: t("validations.longitude.range") }),
  });
};
