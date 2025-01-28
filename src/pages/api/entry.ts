import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return getEntries(req, res);
  } else if (req.method === "POST") {
    return createEntry(req, res);
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

export async function getEntries(req: NextApiRequest, res: NextApiResponse) {
  try {
    const entries = await prisma.entry.findMany();
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero delle Entries" });
  }
}

export async function createEntry(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { applicationHostname, type } = req.body;
    const entry = await prisma.entry.create({
      data: {
        applicationHostname,
        timestamp: new Date(),
        type,
      },
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: "Errore nella creazione dell'Entry" });
  }
}
