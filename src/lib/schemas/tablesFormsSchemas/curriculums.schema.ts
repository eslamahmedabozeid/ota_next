import { z } from "zod";
import { TFunction } from "i18next";
import { REGEX } from "@/constants";

export const CurriculumSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.title_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.title_ar.required") }),
    }),

    description: z.object({
      en: z.string().min(1, { message: t("validations.description_en.required") }),
      ar: z.string().min(1, { message: t("validations.description_ar.required") }),
    }),

    course_id: z.preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z
        .number({ message: t("validations.course_id.required") })
        .int({ message: t("validations.course_id.integer") })
    ),

      active: z.string(),


    order: z
      .number({ message: t("validations.order.required") })
      .int({ message: t("validations.order.integer") })
      .min(1, { message: t("validations.order.min") }),
  });
};
