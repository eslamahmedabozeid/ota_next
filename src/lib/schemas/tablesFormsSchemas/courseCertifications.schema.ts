import { z } from "zod";
import { TFunction } from "i18next";
import { REGEX } from "@/constants";

export const CourseCertificationsSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) =>
  z.object({
    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.title_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.title_ar.required") }),
    }),

    description: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.description_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.description_ar.required") }),
    }),

    course_id: z.union([
      z.string().min(1, { message: t("validations.course_id.required") }),
      z.number({ message: t("validations.course_id.required") }),
    ]),

    image: z
      .union([z.string(), z.literal(""), z.null()])
      .optional(),

    certificate_url: z
      .string()
      .min(1, { message: t("validations.certificate_url.required") }),

    active: z
      .string()
      .min(1, { message: t("validations.active.required") }),
  });
