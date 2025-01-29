import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { z } from "zod";

// Definisci uno schema di validazione per i dati della richiesta
const entryDetailUpdateSchema = z.object({
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

const idSchema = z.number().int().positive();

// Funzione helper per la validazione dell'ID
function validateId(id: any) {
  const idResult = idSchema.safeParse(Number(id));
  if (!idResult.success) {
    return { success: false, error: "ID non valido" };
  }
  return { success: true, data: idResult.data };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntryDetail(req, res);
    case "PUT":
      return updateEntryDetail(req, res);
    case "DELETE":
      return deleteEntryDetail(req, res);
    default:
      res.status(405).json({ error: "Metodo non consentito" });
  }
}

// POST /api/entrydetail/[id]
export async function getEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { success, data, error } = validateId(req.query.id);
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  try {
    const entryDetail = await prisma.entryDetail.findUnique({
      where: { id },
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
    if (!entryDetail) {
      return res.status(404).json({ error: "EntryDetail non trovato" });
    }
    res.status(200).json(entryDetail);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dell'EntryDetail" });
  }
}

// PUT /api/entrydetail/[id]
export async function updateEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { success, data, error } = validateId(req.query.id);
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  // Valida i dati della richiesta
  const result = entryDetailUpdateSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const { user, country, ip, device, isDangerous, tags } = result.data;

  try {
    const entryDetail = await prisma.entryDetail.update({
      where: { id },
      data: {
        user,
        country,
        ip,
        device,
        isDangerous,
        tags: {
          deleteMany: {}, // Elimina i tag esistenti
          create: tags, // Aggiungi i nuovi tag
        },
      },
    });
    res.status(200).json(entryDetail);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore nell'aggiornamento dell'EntryDetail" });
  }
}

// DELETE /api/entrydetail/[id]
export async function deleteEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { success, data, error } = validateId(req.query.id);
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  try {
    await prisma.entryDetail.delete({
      where: { id },
    });
    res.status(200).json({ message: "EntryDetail eliminato con successo" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Errore nell'eliminazione dell'EntryDetail" });
  }
}
