import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import { entrySchema } from "@/lib/validation";
import { handleError, validateApiKey } from "@/lib/helper";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntries(req, res);
    case "POST":
      return createEntry(req, res);
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}

// GET /api/entry
export async function getEntries(req: NextApiRequest, res: NextApiResponse) {
  // API key validation
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  try {
    const entries = await prisma.entry.findMany();
    res.status(200).json(entries);
  } catch (error) {
    handleError({ res, error, message: "Error fetching entries" });
  }
}
// POST /api/entry
export async function createEntry(req: NextApiRequest, res: NextApiResponse) {
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  try {
    /*
    const result = entrySchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.errors });
    }*/

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

    const entry = await prisma.entry.create({
      data: {
        applicationHostname,
        timestamp: new Date(),
        type,
        details: {
          create: {
            user,
            country,
            ip,
            device,
            isDangerous,
            tags: {
              create: tags?.map((tag: any) => ({
                title: tag.title,
                description: tag.description,
                color: tag.color,
              })),
            },
          },
        },
      },
      include: {
        details: {
          include: {
            tags: true, // Inclusione dei tag associati
          },
        },
      },
    });

    res.status(201).json(entry);
  } catch (error) {
    handleError({ res, error, message: "Error creating entry" });
  }
}
