import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/prisma/client";
import validateApiKey, { handleError, validateId } from "@/lib/helper";
import { entryDetailSchema } from "@/lib/validation";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getEntryDetail(req, res);
    case "PUT":
      return updateEntryDetail(req, res);
    case "DELETE":
      return deleteEntryDetail(req, res);
    default:
      res.status(405).json({ error: "Method not allowed" });
  }
}

// GET /api/entrydetail/[id]
export async function getEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // API key validation
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  const { success, data, error } = validateId({ id: Number(req.query.id) });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

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
      return res
        .status(404)
        .json({ status: 404, error: "EntryDetail not found" });
    }
    res.status(200).json(entryDetail);
  } catch (error) {
    handleError({
      res,
      error,
      message: "Error retrieving EntryDetail",
    });
  }
}

// PUT /api/entrydetail/[id]
export async function updateEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // API key validation
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  const { success, data, error } = validateId({ id: Number(req.query.id) });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  // Validate request data
  const result = entryDetailSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors });
  }

  const { user, country, ip, device, isDangerous, tags } = result.data;

  try {
    const entryDetail = await prisma.entryDetail.update({
      where: { id },
      data: {
        user,
        country,
        ip,
        device,
        isDangerous,
        tags: {
          deleteMany: {}, // Delete existing tags
          create: tags, // Add new tags
        },
      },
    });
    res.status(200).json(entryDetail);
  } catch (error) {
    handleError({
      res,
      error,
      message: "Error updating EntryDetail",
    });
  }
}

// DELETE /api/entrydetail/[id]
export async function deleteEntryDetail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKeyValidation = validateApiKey(req.headers);
  if (!apiKeyValidation.success) {
    return res.status(401).json({ error: apiKeyValidation.error });
  }

  const { success, data, error } = validateId({ id: Number(req.query.id) });
  if (!success) {
    return res.status(400).json({ error });
  }
  const id = data;

  try {
    await prisma.entryDetail.delete({
      where: { id },
    });
    res.status(200).json({ message: "EntryDetail successfully deleted" });
  } catch (error) {
    handleError({
      res,
      error,
      message: "Error deleting EntryDetail",
    });
  }
}
