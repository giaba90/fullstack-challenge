import prisma from "@/app/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID non valido" });
  }

  if (req.method === "GET") {
    try {
      const entry = await prisma.entry.findUnique({
        where: { id },
        include: { tags: true },
      });
      if (!entry) {
        return res.status(404).json({ error: "Elemento non trovato" });
      }
      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recupero dell'elemento" });
    }
  } else if (req.method === "PUT") {
    const {
      applicationHostname,
      type,
      user,
      country,
      ip,
      device,
      isDangerous,
      tags,
    } = req.body;

    try {
      const updatedEntry = await prisma.entry.update({
        where: { id },
        data: {
          applicationHostname,
          type,
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
      res.status(200).json(updatedEntry);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Errore nell'aggiornamento dell'elemento" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.entry.delete({
        where: { id },
      });
      res.status(204).end(); // Nessun contenuto da restituire
    } catch (error) {
      res.status(500).json({ error: "Errore nell'eliminazione dell'elemento" });
    }
  }
}
