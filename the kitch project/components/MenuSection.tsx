import { MenuItem } from "@prisma/client";

interface Props {
  title: string;
  items: MenuItem[];
}

export function MenuSection({ title, items }: Props) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-medium">{title}</h2>
      <div className="mt-4 grid md:grid-cols-2 gap-6">
        {items.map(item => (
          <article key={item.id} className="border rounded-lg p-4">
            <div className="flex justify-between">
              <h3 className="font-semibold">{item.name}</h3>
              {item.priceCents && (
                <span>{(item.priceCents / 100).toFixed(2)} {item.currency}</span>
              )}
            </div>
            {item.description && (
              <p className="text-slate-700 mt-2">{item.description}</p>
            )}
            {item.tags?.length ? (
              <ul className="flex flex-wrap gap-2 mt-3">
                {item.tags.map(tag => (
                  <li
                    key={tag}
                    className="text-xs bg-slate-100 px-2 py-1 rounded"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
