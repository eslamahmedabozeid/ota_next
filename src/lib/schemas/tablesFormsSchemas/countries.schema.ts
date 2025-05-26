import { z } from "zod";
import { TFunction } from "i18next";
import { REGEX } from "@/constants";

export const CountrySchema = (t: TFunction) => {
  return z.object({
    name: z.object({
      en: z.string().min(1, { message: t("validations.name.en.required") }),
      ar: z.string().min(1, { message: t("validations.name.ar.required") }),
    }),
    image: z.string().optional(),
    active: z.boolean().default(true),
    tags: z.object({
      en: z.array(z.string()),
      ar: z.array(z.string()),
    }).optional(),
  })
};
