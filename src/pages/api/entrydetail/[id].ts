import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { handleError, validateId, validateApiKey } from "@/lib/helper";
import { entryDetailSchema } from "@/lib/validation";

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
  // Validazione API key
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  const { success, data, error } = validateId({ id: req.query.id });
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
    handleError({
      res,
      error,
      message: "Errore nel recupero dell'EntryDetail",
    });
  }
}

// PUT /api/entrydetail/[id]
export async function updateEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Validazione API key
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  const { success, data, error } = validateId({ id: req.query.id });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  // Valida i dati della richiesta
  const result = entryDetailSchema.safeParse(req.body);
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
    handleError({
      res,
      error,
      message: "Errore nell'aggiornamento dell'EntryDetail",
    });
  }
}

// DELETE /api/entrydetail/[id]
export async function deleteEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  const { success, data, error } = validateId({ id: req.query.id });
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
    handleError({
      res,
      error,
      message: "Errore nell'eliminazione dell'EntryDetail",
    });
  }
}
