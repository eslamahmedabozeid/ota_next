import { z } from "zod";
import { TFunction } from "i18next";

export const StaticPageSchema = (t: TFunction) => {
  return z.object({
    slug: z.string().min(1, { message: t("validations.slug.required") }),
    name: z.object({
      en: z.string().min(1, { message: t("validations.name.en.required") }),
      ar: z.string().min(1, { message: t("validations.name.ar.required") }),
    }),
    title: z.object({
      en: z.string().min(1, { message: t("validations.title.en.required") }),
      ar: z.string().min(1, { message: t("validations.title.ar.required") }),
    }),
    sub_title: z.object({
      en: z.string().min(1, { message: t("validations.sub_title.en.required") }),
      ar: z.string().min(1, { message: t("validations.sub_title.ar.required") }),
    }),
    details: z.object({
      en: z.string().min(1, { message: t("validations.details.en.required") }),
      ar: z.string().min(1, { message: t("validations.details.ar.required") }),
    }),
    action_button_title: z.object({
      en: z.string().min(1, { message: t("validations.action_button_title.en.required") }),
      ar: z.string().min(1, { message: t("validations.action_button_title.ar.required") }),
    }),
    main_image: z.string().optional(),
    image: z.string().optional(),
    video: z.string().optional(),
  });
};
