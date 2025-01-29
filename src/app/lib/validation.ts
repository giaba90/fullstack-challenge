import { z } from "zod";

const entryDetailSchema = z.object({
  user: z.string().nonempty("Il campo user è obbligatorio"),
  country: z.string().nonempty("Il campo country è obbligatorio"),
  ip: z.string().nonempty("Il campo ip è obbligatorio"),
  device: z.string().nonempty("Il campo device è obbligatorio"),
  isDangerous: z.boolean(),
  tags: z
    .array(
      z.object({
        title: z.string().nonempty("Il campo title è obbligatorio"),
        description: z.string().optional(),
        color: z.string().optional(),
      })
    )
    .optional(),
});

const entrySchema = z.object({
  applicationHostname: z
    .string()
    .nonempty("Il campo applicationHostname è obbligatorio"),
  type: z.string().nonempty("Il campo type è obbligatorio"),
});

const idSchema = z.number().int().positive();

export { entrySchema, entryDetailSchema, idSchema };
