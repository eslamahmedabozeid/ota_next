import { z } from "zod";
import { TFunction } from "i18next";

export const PackageCategoriesSchema = (t: TFunction) =>
   z
    .object({
      title: z.object({
        en: z.string().min(1, { message: t("validations.name.en.required") }),
        ar: z.string().min(1, { message: t("validations.name.ar.required") }),
      }),

      active: z.boolean().default(true),

      image: z.any({
        required_error: t("validations.image.required")
      }),

    })
    .transform((data) => ({
      ...data,
    }));
