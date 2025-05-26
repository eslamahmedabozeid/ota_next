import { TFunction } from "i18next";
import { z } from "zod";

export const ContactsSchema = (
  t: TFunction,
  type: "create" | "update" = "create"
) => {
  return z.object({
    status: z
      .string()
      .min(1, { message: t("validations.status.required") })
      .refine((val) => ["new", "opened", "closed"].includes(val), {
        message: t("validations.status.invalid"),
      }),
  });
};