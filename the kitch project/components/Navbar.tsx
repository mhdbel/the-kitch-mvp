import Link from "next/link";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold text-xl">The Kitch</Link>
      <div className="flex gap-6 items-center">
        <Link href="/menu">Menu</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <LanguageToggle />
      </div>
    </nav>
  );
}
