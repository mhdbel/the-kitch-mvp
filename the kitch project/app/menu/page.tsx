import { prisma } from "@/lib/db";

export default async function MenuPage() {
  const sections = await prisma.menuSection.findMany({
    where: { published: true },
    include: { items: { where: { published: true } } }
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Our Menu</h1>
      {sections.map(section => (
        <section key={section.id} className="mb-10">
          <h2 className="text-2xl font-medium">{section.title}</h2>
          <div className="mt-4 grid md:grid-cols-2 gap-6">
            {section.items.map(item => (
              <article key={item.id} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.priceCents && (
                    <span>{(item.priceCents / 100).toFixed(2)} MAD</span>
                  )}
                </div>
                {item.description && (
                  <p className="text-slate-700 mt-2">{item.description}</p>
                )}
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
