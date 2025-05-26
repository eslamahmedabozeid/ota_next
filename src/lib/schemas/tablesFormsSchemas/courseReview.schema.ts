import { z } from "zod";
import { TFunction } from "i18next";
import { REGEX } from "@/constants";

export const CourseReviewSchema = (t: TFunction) => {
  return z.object({
    user_name: z
      .string()
      .min(1, { message: t("validations.user_name.required") }),

    phone: z
      .string()
      .min(1, { message: t("validations.phone.required") })
      .regex(REGEX.SAUDI_PHONE, {
        message: t("validations.phone.pattern"),
      }),

    email: z
      .string()
      .min(1, { message: t("validations.email.required") })
      .regex(REGEX.EMAIL, {
        message: t("validations.email.pattern"),
      }),

      course_id: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z
          .number({ message: t("validations.course_id.required") })
          .int({ message: t("validations.course_id.integer") })
      ),

      image: z
      .union([z.string(), z.literal(""), z.null()])
      .optional(),

    comment: z
      .string()
      .min(1, { message: t("validations.comment.required") }),

    rate: z
      .number({ message: t("validations.rate.required") })
      .min(1, { message: t("validations.rate.min") })
      .max(5, { message: t("validations.rate.max") }),

    status: z.enum(["pending", "published", "rejected"], {
      message: t("validations.status.required"),
    }),
  });
};
