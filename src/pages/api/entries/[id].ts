import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const entry = await prisma.entry.findUnique({
        where: { id },
        include: { tags: true },
      });
      if (!entry) {
        return res.status(404).json({ error: "Elemento non trovato" });
      }
      res.status(200).json(entry);
    } catch (error) {
      res.status(500).json({ error: "Errore nel recupero dell'elemento" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Metodo ${req.method} non consentito` });
  }

  if (req.method === "PUT") {
    const { id } = req.query;
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

    try {
      const updatedEntry = await prisma.entry.update({
        where: { id },
        data: {
          applicationHostname,
          type,
          user,
          country,
          ip,
          device,
          isDangerous,
          tags: {
            deleteMany: {}, // Elimina i tag esistenti
            create: tags, // Aggiungi i nuovi tag
          },
        },
      });
      res.status(200).json(updatedEntry);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Errore nell'aggiornamento dell'elemento" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      await prisma.entry.delete({
        where: { id },
      });
      res.status(204).end(); // Nessun contenuto da restituire
    } catch (error) {
      res.status(500).json({ error: "Errore nell'eliminazione dell'elemento" });
    }
  }
}
