import { z } from "zod";
import { TFunction } from "i18next";

export const ToursSchema = (t: TFunction) =>
   z
    .object({
      name: z.object({
        en: z.string().min(1, { message: t("validations.name.en.required") }),
        ar: z.string().min(1, { message: t("validations.name.ar.required") }),
      }),

      active: z.boolean().default(true),


    })
    .transform((data) => ({
      ...data,
    }));
