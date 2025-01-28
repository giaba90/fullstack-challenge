import prisma from "@/app/prisma/client";

async function main() {
  const user = await prisma.entry.create({
    data: {
      user: "Joe Smith",
      country: "UK",
      ip: "1.2.3.4",
      device: "Windows / Chrome 121.0",
      isDangerous: true,
      tags: {
        create: [
          {
            title: "ERROR",
            description:
              "This is a description for the ERROR tag lorem ipsum dolor sit amet...",
            color: "#F17567",
          },
        ],
      },
    },
  });

  console.log(user);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
