import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: { method: string },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      json: { (arg0: any): void; new (): any };
    };
  }
) {
  if (req.method === "POST") {
    const newEntry = await prisma.entry.create({
      data: {
        applicationHostname: "new_app",
        timestamp: new Date(),
        type: "WEB",
        user: "Jack Black",
        country: "USA",
        ip: "11.22.33.44",
        device: "MacOs / Firefox 101.2",
        isDangerous: false,
        tags: {
          create: [
            {
              title: "OK",
              description: "This is a description for the OK tag",
              color: "#6EB72F",
            },
            {
              title: "NEW",
              description:
                "this is the NEW tag and it appears because lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              color: "#026FBC",
            },
          ],
        },
      },
    });

    res.status(201).json(newEntry);
  } else {
    res.status(405).json({ message: "Metodo non consentito" });
  }
}
