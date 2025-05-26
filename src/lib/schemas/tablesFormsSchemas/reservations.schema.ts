import { z } from "zod";
import { TFunction } from "i18next";

export const ReservationSchema = (t: TFunction) =>
  z
    .object({

      notes: z.string().optional(),
      status: z
        .coerce
        .number()
        .min(1, { message: t("validations.status.required") }),

    })



