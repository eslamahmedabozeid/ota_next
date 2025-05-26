import { z } from "zod";
import { TFunction } from "i18next";

export const PartnersSchema = (t: TFunction) =>
  z
    .object({
      name: z.object({
        en: z.string().min(1, { message: t("validations.name.en.required") }),
        ar: z.string().min(1, { message: t("validations.name.ar.required") }),
      }),
      image_url: z.union([
        z.string().url().optional(),
        z.any().optional(), 
      ]),
      order_number: z
        .number({ invalid_type_error: t("validations.order_number.invalid") })
        .min(0, { message: t("validations.order_number.min") }),
      is_featured: z.boolean().default(false),
      active: z.boolean().default(true),
    })
    .transform(({ image_url, ...rest }) => {
      const hasValidImage =
        image_url !== undefined &&
        image_url !== null &&
        image_url !== "";

      return {
        ...rest,
        ...(hasValidImage ? { image: image_url } : {}), 
      };
    });
