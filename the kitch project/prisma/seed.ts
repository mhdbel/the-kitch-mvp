import { prisma } from "../lib/db";

async function main() {
  // Example seed data — replace with parsed PDF content
  const brunch = await prisma.menuSection.create({
    data: {
      title: "Brunch Specials",
      published: true,
      items: {
        create: [
          {
            name: "Avocado Toast",
            description: "Sourdough bread, smashed avocado, cherry tomatoes",
            priceCents: 6500,
            currency: "MAD",
            tags: ["vegetarian"],
            published: true,
          },
          {
            name: "Pancake Stack",
            description: "Fluffy pancakes with maple syrup and berries",
            priceCents: 5500,
            currency: "MAD",
            tags: ["sweet"],
            published: true,
          },
        ],
      },
    },
  });

  console.log("Seeded section:", brunch.title);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
