import { z } from "zod";
import { TFunction } from "i18next";

export const VisaTypeSchema = (t: TFunction) =>
  z.object({
    title: z.object({
      en: z.string().min(1, { message: t("validations.name.en.required") }),
      ar: z.string().min(1, { message: t("validations.name.ar.required") }),
    }),
    price: z
      .coerce
      .number()
      .positive({ message: t("validations.price.invalid") }),
    processing_time: z
      .string()
      .min(1, { message: t("validations.processing_time.required") }),
    validity: z
      .string()
      .min(1, { message: t("validations.validity.required") }),
    active: z.boolean().default(true),
  });
