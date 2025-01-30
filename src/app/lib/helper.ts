import { NextApiRequest, NextApiResponse } from "next";
import { idSchema } from "./validation";

// Helper function for error handling
function handleError({
  res,
  message,
}: {
  res: NextApiResponse;
  error: any;
  message: string;
}) {
  res.status(500).json({ error: message });
}

// Helper function for ID validation
function validateId({ id }: { id: number }) {
  const idResult = idSchema.safeParse(id);
  if (!idResult.success) {
    return { success: false, error: "Invalid ID" };
  }
  return { success: true, data: idResult.data };
}

// Helper function for API key validation
function validateApiKey(headers: NextApiRequest["headers"]) {
  const apiKey = headers["x-api-key"];
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return { success: false, error: "Invalid API KEY" };
  }
  return { success: true };
}

export { handleError, validateId, validateApiKey };
