import { z } from "zod";
import { TFunction } from "i18next";
import { validateFile } from "../common-rules";
import { REGEX } from "@/constants";

export const CourseSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    // slug: z
    //   .string()
    //   .min(1, { message: t("validations.slug.required") })
    //   .regex(REGEX.SLUG, { message: t("validations.slug.pattern") }),

    category_id: z
      .union([
        z.string().min(1, { message: t("validations.category.required") }),
        z.number({ message: t("validations.category.required") }),
      ]),

    level_id: z
    .union([
      z.string().min(1, { message: t("validations.category.required") }),
      z.number({ message: t("validations.category.required") }),
    ]),

    type: z.string().min(1, { message: t("validations.type.required") }),


    thumbnail:z
    .union([z.string(), z.literal(""), z.null()])
    .optional(),

       images: z
        .union([
          z.string(),
          z.literal(""),
          z.null(),
          z.array(z.string()),
        ])
        .optional(),

    is_featured: z.string(),
    is_current: z.string(),

    available_users_num: z
      .number({ message: t("validations.available_users_num.required") })
      .int({ message: t("validations.available_users_num.integer") }),

      order: z
      .number({ invalid_type_error: t("validations.order.required") })
      .int({ message: t("validations.order.integer") })
      .nullable(),

    registered_users: z
      .number({ message: t("validations.registered_users.required") })
      .int({ message: t("validations.registered_users.integer") }),

    duration_type: z
      .enum(["days", "weeks", "months","hours"], {
        message: t("validations.duration_type.required"),
      }),

    duration_value: z
      .number({ message: t("validations.duration_value.required") })
      .int({ message: t("validations.duration_value.integer") }),

      branches: z
      .array(
        z.union([z.number(), z.string()])
          .transform((val) => Number(val))
          .refine((val) => Number.isInteger(val), {
            message: t("validations.branches.integer"),
          })
      )
      .min(1, { message: t("validations.branches.required") }),

    brochure: z
      .string(),

    brief_video: z
      .string(),

    available_dates: z
      .array(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: t("validations.available_dates.pattern"),
      }))
      .optional(),

    gender: z.enum(["male", "female", "all"], {
      message: t("validations.gender.required"),
    }),

    active: z.string().min(1, { message: t("validations.active.required") }),

    title: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.title_en.required") })
        ,
      ar: z
        .string()
        .min(1, { message: t("validations.title_ar.required") }),
    }),

    short_info: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.short_info_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.short_info_ar.required") }),
    }),
    
    details: z.object({
      en: z
        .string()
        .min(1, { message: t("validations.details_en.required") }),
      ar: z
        .string()
        .min(1, { message: t("validations.details_ar.required") })
        
    }),
  });
};
