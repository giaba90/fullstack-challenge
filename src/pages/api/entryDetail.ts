import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/client";
import { handleError } from "@/lib/helper";
import { entryDetailSchema } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntryDetails(req, res);
    case "POST":
      return createEntryDetail(req, res);
    default:
      res.status(405).json({ error: "Metodo non consentito" });
  }
}

// GET /api/entryDetail
async function getEntryDetails(req: NextApiRequest, res: NextApiResponse) {
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
    handleError(res, error, "Errore nel recupero degli EntryDetails");
  }
}

// POST /api/entryDetail
async function createEntryDetail(req: NextApiRequest, res: NextApiResponse) {
  // Valida i dati della richiesta
  const result = entryDetailSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  try {
    const { user, country, ip, device, isDangerous, tags } = result.data;
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
    handleError(res, error, "Errore nella creazione dell'EntryDetail");
  }
}
