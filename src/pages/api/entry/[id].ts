import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getEntry(req, res);
  }
  if (req.method === "PUT") {
    return updateEntry(req, res);
  }
  if (req.method === "DELETE") {
    return deleteEntry(req, res);
  }
  res.status(405).json({ error: "Metodo non consentito" });
}

async function getEntry(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }

  try {
    const entry = await prisma.entry.findUnique({
      where: { id },
    });
    if (!entry) {
      return res.status(404).json({ error: "Entry non trovata" });
    }
    res.status(200).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dell'Entry" });
  }
}

async function updateEntry(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }

  const { applicationHostname, type } = req.body;

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
    res.status(500).json({ error: "Errore nell'aggiornamento dell'Entry" });
  }
}

async function deleteEntry(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }

  try {
    await prisma.entry.delete({
      where: { id },
    });
    res.status(200).json({ message: "Entry eliminata con successo" });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminazione dell'Entry" });
  }
}
