import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { z } from "zod";

// Definisci uno schema di validazione per i dati della richiesta
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getEntryDetails(req, res);
  } else if (req.method === "POST") {
    return createEntryDetail(req, res);
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

export async function getEntryDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const entryDetails = await prisma.entryDetail.findMany({
      include: {
        tags: {
          select: {
            title: true,
            description: true,
            color: true,
          },
        },
      },
    });
    res.status(200).json(entryDetails);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero degli EntryDetails" });
  }
}

export async function createEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Valida i dati della richiesta
    const result = entryDetailSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }

    const { user, country, ip, device, isDangerous, tags } = result.data;
    const entryDetail = await prisma.entryDetail.create({
      data: {
        user,
        country,
        ip,
        device,
        isDangerous,
        tags: {
          create: tags,
        },
      },
    });
    res.status(201).json(entryDetail);
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione dell'EntryDetail" });
  }
}
