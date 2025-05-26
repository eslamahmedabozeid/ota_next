import { z } from "zod";
import { TFunction } from "i18next";

export const RatesSchema = (t: TFunction) =>
  z.object({
    id: z.number().optional(),
    name: z.string().min(1, { message: t("validations.name.required") }),
    comment: z.string().min(1, { message: t("validations.comment.required") }),
    sub_title: z.string().optional(),
    image: z.union([
      z.string().url().optional(), 
      z.any().optional(),         
    ]),
    stars: z
      .number({ invalid_type_error: t("validations.stars.invalid") })
      .min(1, { message: t("validations.stars.min") })
      .max(5, { message: t("validations.stars.max") }),
    active: z.boolean().default(true),
    is_featured: z.boolean().default(false),
  });
