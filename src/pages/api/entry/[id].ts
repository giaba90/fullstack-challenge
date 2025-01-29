import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { validateId, handleError, validateApiKey } from "@/lib/helper";
import { entrySchema } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntry(req, res);
    case "PUT":
      return updateEntry(req, res);
    case "DELETE":
      return deleteEntry(req, res);
    default:
      res.status(405).json({ error: "Metodo non consentito" });
  }
}

// Funzione per ottenere un entry
async function getEntry(req: NextApiRequest, res: NextApiResponse) {
  // Validazione API key
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  // Validazione ID
  const { success, data, error } = validateId({ id: req.query.id });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  try {
    const entry = await prisma.entry.findUnique({
      where: { id },
    });
    if (!entry) {
      return res.status(404).json({ error: "Entry non trovata" });
    }
    res.status(200).json(entry);
  } catch (error) {
    handleError({ res, error, message: "Errore nella ricerca dell'Entry" });
  }
}

// Funzione per aggiornare un entry
async function updateEntry(req: NextApiRequest, res: NextApiResponse) {
  // Validazione API key
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  // Validazione ID
  const { success, data, error } = validateId({ id: req.query.id });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  // Valida i dati della richiesta
  const result = entrySchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const { applicationHostname, type } = result.data;

  try {
    const entry = await prisma.entry.update({
      where: { id },
      data: {
        applicationHostname,
        timestamp: new Date(),
        type,
      },
    });
    res.status(200).json(entry);
  } catch (error) {
    handleError({
      res,
      error,
      message: "Errore nell'aggiornamento dell'Entry",
    });
  }
}

// Funzione per eliminare un entry
async function deleteEntry(req: NextApiRequest, res: NextApiResponse) {
  // Validazione API key
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  // Validazione ID
  const { success, data, error } = validateId({ id: req.query.id });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  try {
    await prisma.entry.delete({
      where: { id },
    });
    res.status(200).json({ message: "Entry eliminata con successo" });
  } catch (error) {
    handleError({ res, error, message: "Errore nell'eliminazione dell'Entry" });
  }
}
