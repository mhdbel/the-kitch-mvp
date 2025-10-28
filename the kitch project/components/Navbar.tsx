"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageToggle } from "./LanguageToggle";
import { translations, languages, defaultLang } from "@/lib/i18n";

export function Navbar() {
  const pathname = usePathname();
  const lang = languages.find(l => pathname.startsWith(`/${l}`)) || defaultLang;
  const t = translations[lang];

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link href={`/${lang}`} className="font-bold text-xl">The Kitch</Link>
      <div className="flex gap-6 items-center">
        <Link href={`/${lang}/menu`}>{t.menu}</Link>
        <Link href={`/${lang}/gallery`}>{t.gallery}</Link>
        <Link href={`/${lang}/about`}>{t.about}</Link>
        <Link href={`/${lang}/contact`}>{t.contact}</Link>
        <LanguageToggle />
      </div>
    </nav>
  );
}
