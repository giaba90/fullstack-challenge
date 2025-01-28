import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    getEntryDetail(req, res);
  } else if (req.method === "PUT") {
    updateEntryDetail(req, res);
  } else if (req.method === "DELETE") {
    deleteEntryDetail(req, res);
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

export async function getEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }
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
      return res.status(404).json({ error: "Entry non trovata" });
    }
    res.status(200).json(entryDetail);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dell'Entry" });
  }
}

export async function updateEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }

  try {
    const updatedEntry = await prisma.entryDetail.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornamento dell'Entry" });
  }
}

export async function deleteEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }
  try {
    await prisma.entryDetail.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Entry eliminata con successo" });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminazione dell'Entry" });
  }
}
