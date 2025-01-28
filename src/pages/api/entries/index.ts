import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const entries = await prisma.entry.findMany();
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recupero degli elementi" });
    }
  } else if (req.method === "POST") {
    const {
      applicationHostname,
      timestamp,
      type,
      user,
      country,
      ip,
      device,
      isDangerous,
      tags,
    } = req.body;

    try {
      const newEntry = await prisma.entry.create({
        data: {
          applicationHostname,
          timestamp: new Date(timestamp),
          type,
          user,
          country,
          ip,
          device,
          isDangerous,
          tags: {
            create: tags, // Inserisci i tag direttamente
          },
        },
      });
      res.status(201).json(newEntry);
    } catch (error) {
      res.status(500).json({ error: "Errore nella creazione dell'elemento" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).json({ error: `Metodo ${req.method} non consentito` });
  }
}
