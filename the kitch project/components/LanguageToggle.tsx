"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function LanguageToggle() {
  const pathname = usePathname();
  const isFrench = pathname.startsWith("/fr");

  // Simple toggle between /fr and /en routes
  const target = isFrench
    ? pathname.replace("/fr", "/en")
    : pathname.startsWith("/en")
    ? pathname.replace("/en", "/fr")
    : `/fr${pathname}`;

  return (
    <Link href={target} className="text-sm font-medium underline">
      {isFrench ? "EN" : "FR"}
    </Link>
  );
}
