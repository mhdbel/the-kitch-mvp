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
 * Parse menu text from PDF into structured sections/items.
 * Adjust regexes depending on how your PDF text is formatted.
 */
async function parseMenuFromPdf(filePath: string): Promise<ParsedMenu> {
  const dataBuffer = fs.readFileSync(filePath);
  const pdfData = await pdfParse(dataBuffer);
  const text = pdfData.text;

  // Split by uppercase section headers (heuristic)
  const sections = text.split(/\n(?=[A-Z][A-Z ]{3,})/);
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
        // Treat as description of the last item
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
  // Adjust path: PDF should be in /data folder at project root
  const menu = await parseMenuFromPdf("data/Menu The Kitch (1).pdf");

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
