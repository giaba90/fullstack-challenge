import { z } from "zod";

const entryDetailSchema = z.object({
  user: z.string().nonempty("The user field is required"),
  country: z.string().nonempty("The country field is required"),
  ip: z.string().nonempty("The IP field is required"),
  device: z.string().nonempty("The device field is required"),
  isDangerous: z.boolean(),
  tags: z
    .array(
      z.object({
        title: z.string().nonempty("The title field is required"),
        description: z.string().nonempty("The description field is required"),
        color: z.string().nonempty("The color field is required"),
      })
    )
    .optional(),
});

const entrySchema = z.object({
  applicationHostname: z
    .string()
    .nonempty("The applicationHostname field is required"),
  type: z.string().nonempty("The type field is required"),
});

const idSchema = z.number().int().positive();

export { entrySchema, entryDetailSchema, idSchema };
