// pages/api/entry.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

// Creare un nuovo Entry
export async function createEntry(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { applicationHostname, timestamp, type } = req.body;
      const entry = await prisma.entry.create({
        data: {
          applicationHostname,
          timestamp: new Date(timestamp),
          type,
        },
      });
      res.status(201).json(entry);
    } catch (error) {
      res.status(500).json({ error: "Errore nella creazione dell'Entry" });
    }
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

// Leggere tutte le Entry
export async function getEntries(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const entries = await prisma.entry.findMany();
      res.status(200).json(entries);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recupero delle Entries" });
    }
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

// Operazione principale per Entry
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createEntry(req, res);
  }
  if (req.method === "GET") {
    return getEntries(req, res);
  }
  res.status(405).json({ error: "Metodo non consentito" });
}
