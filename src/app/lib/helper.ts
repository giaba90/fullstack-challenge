import { NextApiRequest, NextApiResponse } from "next";
import { idSchema } from "./validation";

// Funzione helper per la gestione degli errori
function handleError({
  res,
  error,
  message,
}: {
  res: NextApiResponse;
  error: any;
  message: string;
}) {
  // console.error(error);
  res.status(500).json({ error: message });
}

// Funzione helper per la validazione dell'ID
function validateId({ id }: { id: number }) {
  const idResult = idSchema.safeParse(id);
  if (!idResult.success) {
    return { success: false, error: "ID non valido" };
  }
  return { success: true, data: idResult.data };
}

// Funzione helper per la validazione dell'API key
function validateApiKey(headers: NextApiRequest["headers"]) {
  const apiKey = headers["x-api-key"];
  if (apiKey !== process.env.NEXT_PUBLIC_API_KEY) {
    return { success: false, error: "API KEY non valida" };
  }
  return { success: true };
}

export { handleError, validateId, validateApiKey };
