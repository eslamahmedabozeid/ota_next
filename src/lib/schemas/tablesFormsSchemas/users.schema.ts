import { TFunction } from "i18next";
import { z } from "zod";
import { validateFile } from "../common-rules";

export const UsersSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z
    .object({
      first_name: z
        .string()
        .min(1, { message: t("validations.first_name.required") }),
      last_name: z
        .string()
        .min(1, { message: t("validations.last_name.required") }),

      email: z
        .string()
        .min(1, { message: t("validations.email.required") })
        .regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, {
          message: t("validations.email.pattern"),
        }),

      phone: z
        .string()
        .min(1, { message: t("validations.phone.required") })
        .regex(/^(05\d{8}|\+9665\d{8})$/, {
          message: t("validations.phone.pattern"),
        }),

      active: z.preprocess(
  (val) => {
    if (val === "1" || val === 1 || val === true) return true;
    if (val === "0" || val === 0 || val === false) return false;
    return val;
  },
  z.boolean({
    required_error: t("validations.active.required"),
    invalid_type_error: t("validations.active.invalid"),
  })
),
      password: type === "create"
        ? z.string().min(6, { message: t("validations.password.required") })
        : z.string().optional(),

      password_confirmation: type === "create"
        ? z.string().min(6, {
            message: t("validations.password_confirmation.required"),
          })
        : z.string().optional(),
    })
    .refine(
      (data) =>
        type === "update"
          ? !data.password || data.password === data.password_confirmation
          : data.password === data.password_confirmation,
      {
        path: ["password_confirmation"],
        message: t("validations.password_confirmation.match"),
      }
    );
};


