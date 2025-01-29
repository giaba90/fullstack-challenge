import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { validateId } from "@/lib/helper";
import { handleError } from "@/lib/helper";
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

// GET /api/entry/[id]
async function getEntry(req: NextApiRequest, res: NextApiResponse) {
  //validation
  const { success, data, error } = validateId(req.query.id);
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
    handleError(res, error, "Errore nella ricerca dell'Entry");
  }
}

// PUT /api/entry/[id]
async function updateEntry(req: NextApiRequest, res: NextApiResponse) {
  //validation
  const { success, data, error } = validateId(req.query.id);
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

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
    handleError(res, error, "Errore nell'aggiornamento dell'Entry");
  }
}

// DELETE /api/entry/[id]
async function deleteEntry(req: NextApiRequest, res: NextApiResponse) {
  //validation
  const { success, data, error } = validateId(req.query.id);
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
    handleError(res, error, "Errore nell'eliminazione dell'Entry");
  }
}
