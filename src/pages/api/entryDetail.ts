import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";

export async function createEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { user, country, ip, device, isDangerous, tags } = req.body;
      const entryDetail = await prisma.entryDetail.create({
        data: {
          user,
          country,
          ip,
          device,
          isDangerous,
          tags: {
            create: tags,
          },
        },
      });
      res.status(201).json(entryDetail);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Errore nella creazione dell'EntryDetail" });
    }
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

export async function getEntryDetails(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const entryDetails = await prisma.entryDetail.findMany({
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
      res.status(200).json(entryDetails);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recupero degli EntryDetails" });
    }
  } else {
    res.status(405).json({ error: "Metodo non consentito" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    return createEntryDetail(req, res);
  }
  if (req.method === "GET") {
    return getEntryDetails(req, res);
  }
  res.status(405).json({ error: "Metodo non consentito" });
}
