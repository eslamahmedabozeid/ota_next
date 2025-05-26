import { z } from "zod";
import { TFunction } from "i18next";
import { validateFile } from "../common-rules";
import { REGEX } from "@/constants";

export const NewsSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.title_en.required") })
        ,
      ar: z
        .string()
        .min(1, { message: t("validations.title_ar.required") })
       ,
    }),

    short_info: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.short_info_en.required") })
        ,
      ar: z
        .string()
        .min(1, { message: t("validations.short_info_ar.required") })
        ,
    }),

    details: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.details_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.details_ar.required") })
    }),

    // slug: z
    //   .string()
    //   .min(1, { message: t("validations.slug.required") })
    //   .regex(REGEX.SLUG, { message: t("validations.slug.pattern") }),

    thumbnail:
    z.union([z.string(), z.literal(""), z.null(),
      z.object({}).catchall(z.any()) // catch-all flexible object
    ])
    .optional(),

    images: z
        .union([
          z.string(),
          z.literal(""),
          z.null(),
          z.array(z.string()),
        ])
        .optional(),

    is_featured:  z.string(),
    active:  z.string(),
  });
};
