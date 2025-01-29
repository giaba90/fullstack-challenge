import { NextApiResponse } from "next";
import { idSchema } from "./validation";

// Funzione helper per la gestione degli errori
function handleError(res: NextApiResponse, error: any, message: string) {
  console.error(error);
  res.status(500).json({ error: message });
}

// Funzione helper per la validazione dell'ID
function validateId(id: any) {
  const idResult = idSchema.safeParse(Number(id));
  if (!idResult.success) {
    return { success: false, error: "ID non valido" };
  }
  return { success: true, data: idResult.data };
}

export { handleError, validateId };
