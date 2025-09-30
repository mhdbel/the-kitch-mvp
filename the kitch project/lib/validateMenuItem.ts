export type DraftItem = {
  name?: string;
  description?: string;
  price?: string; // raw scraped
  sourceUrl: string;
  section?: string;
};

export function validateDraftItem(d: DraftItem) {
  const errors: string[] = [];
  if (!d.name || d.name.trim().length < 2) errors.push("name_missing");

  const priceCents =
    d.price && /^\d+(\.\d{1,2})?$/.test(d.price)
      ? Math.round(parseFloat(d.price) * 100)
      : null;

  if (d.price && priceCents === null) errors.push("price_unparseable");

  return {
    ok: errors.length === 0,
    errors,
    normalized: {
      name: d.name?.trim(),
      description: d.description?.trim() ?? null,
      priceCents,
      currency: "MAD",
      tags: [],
      provenance: { source: d.sourceUrl }
    }
  };
}
