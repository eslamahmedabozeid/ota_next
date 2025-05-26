import { z } from "zod";
import { TFunction } from "i18next";

export const SettingsSchema = (t: TFunction) =>
  z.object({
    id: z.number().optional(),
    slug: z.string().min(1, { message: t("validations.slug.required") }),
    name: z.object({
      ar: z.string().min(1, { message: t("validations.name.ar.required") }),
      en: z.string().min(1, { message: t("validations.name.en.required") }),
    }),
    title: z.object({
      ar: z.string().min(1, { message: t("validations.title.ar.required") }),
      en: z.string().min(1, { message: t("validations.title.en.required") }),
    }),
    action_button_title: z.object({
      ar: z.string().optional(),
      en: z.string().optional(),
    }).optional(),

    main_image_url: z.string().url().optional(),
    image_url: z.string().url().optional(),
    video_url: z.string().url().optional(),
     value: z
      .number({ invalid_type_error: t("validations.value.invalid") })
      .min(0, { message: t("validations.value.min") }),
    // value: z.object({
    //   social: z.record(z.string()).optional(),  
    // }).optional(),
  });
