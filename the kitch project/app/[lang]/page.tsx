import { translations, defaultLang } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";

export default function LangHome({ params }: { params: { lang: string } }) {
  const lang = (params.lang as "en" | "fr") || defaultLang;
  const t = translations[lang];

  return (
    <section className="flex flex-col items-center text-center py-16">
      <Image src="/logo.png" alt="The Kitch Logo" width={160} height={160} />
      <h1 className="text-4xl font-bold mt-6">{t.welcome}</h1>
      <p className="mt-4 text-lg text-slate-600">{t.tagline}</p>
      <div className="mt-8 flex gap-4">
        <Link href={`/${lang}/menu`} className="px-6 py-3 bg-brand-red text-white rounded-lg">
          {t.menu}
        </Link>
        <Link href={`/${lang}/gallery`} className="px-6 py-3 border border-brand-red text-brand-red rounded-lg">
          {t.gallery}
        </Link>
      </div>
    </section>
  );
}
