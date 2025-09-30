import { ReactNode } from "react";
import { languages, defaultLang } from "@/lib/i18n";

export default function LangLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang = languages.includes(params.lang as any)
    ? params.lang
    : defaultLang;

  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
