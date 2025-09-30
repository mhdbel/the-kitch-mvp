import { prisma } from "../lib/db";
import fs from "fs";
import pdfParse from "pdf-parse";

type ParsedMenu = {
  section: string;
  items: {
    name: string;
    description?: string;
    priceCents?: number;
    tags?: string[];
  }[];
}[];

/**
 * Example parser: adjust regexes to match your PDF’s structure.
 */
async function parseMenuFromPdf(filePath: string): Promise<ParsedMenu> {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  const text = pdfData.text;

  // Split by sections (e.g., "Brunch", "Drinks", etc.)
  const sections = text.split(/\n(?=[A-Z][A-Z ]{3,})/); // crude heuristic
  const parsed: ParsedMenu = [];

  for (const section of sections) {
    const lines = section.split("\n").map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    const sectionTitle = lines[0];
    const items: ParsedMenu[0]["items"] = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Example: "Avocado Toast .... 65 MAD"
      const match = line.match(/^(.*?)\s+(\d+)\s*MAD$/i);
      if (match) {
        items.push({
          name: match[1].trim(),
          priceCents: parseInt(match[2], 10) * 100,
        });
      } else {
        // fallback: treat as description of previous item
        if (items.length > 0) {
          items[items.length - 1].description = line;
        }
      }
    }

    if (items.length) {
      parsed.push({ section: sectionTitle, items });
    }
  }

  return parsed;
}

async function main() {
  const menu = await parseMenuFromPdf("Menu The Kitch (1).pdf");

  for (const section of menu) {
    await prisma.menuSection.create({
      data: {
        title: section.section,
        published: true,
        items: {
          create: section.items.map(item => ({
            name: item.name,
            description: item.description,
            priceCents: item.priceCents,
            currency: "MAD",
            tags: item.tags ?? [],
            published: true,
          })),
        },
      },
    });
  }

  console.log("✅ Menu seeded successfully");
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
