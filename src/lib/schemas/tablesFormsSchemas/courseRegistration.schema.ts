import { z } from "zod";
import { TFunction } from "i18next";
import { REGEX } from "@/constants";

export const CourseRegistrationSchema = (t: TFunction) => {
  return z
    .object({
      user_name: z
        .string()
        .min(1, { message: t("validations.user_name.required") }),

      email: z
        .string()
        .min(1, { message: t("validations.email.required") })
        .regex(REGEX.EMAIL, { message: t("validations.email.pattern") }),

      phone: z
        .string()
        .min(1, { message: t("validations.phone.required") })
        .regex(REGEX.SAUDI_PHONE, {
          message: t("validations.phone.pattern"),
        }),

      national_id_number: z
        .string()
        .min(9, { message: t("validations.national_id_number.min") })
        .max(20, { message: t("validations.national_id_number.max") }),

      course_id: z.preprocess(
        (val) => (typeof val === "string" ? Number(val) : val),
        z
          .number({ message: t("validations.course_id.required") })
          .int({ message: t("validations.course_id.integer") })
      ),

      type: z.string().min(1, { message: t("validations.type.required") }),

      employees_number: z
        .preprocess(
          (val) => (val === "" ? undefined : val), // optional empty string handling
          z
            .number({ message: t("validations.employees_number.required") })
            .int({ message: t("validations.employees_number.integer") })
            .min(1, { message: t("validations.employees_number.min") })
            .optional()
        ),

      message: z.string().optional(),

      status: z.enum(["new", "approved", "rejected"], {
        message: t("validations.status.required"),
      }),
    })

    .superRefine((data, ctx) => {
      if (data.type === "business" && !data.employees_number) {
        ctx.addIssue({
          path: ["employees_number"],
          code: z.ZodIssueCode.custom,
          message: t("validations.employees_number.required_if_business"),
        });
      }
    });
};
