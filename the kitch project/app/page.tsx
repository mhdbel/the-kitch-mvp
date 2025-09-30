import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center py-16">
      <Image src="/logo.png" alt="The Kitch Logo" width={160} height={160} />
      <h1 className="text-4xl font-bold mt-6">Welcome to The Kitch</h1>
      <p className="mt-4 text-lg text-slate-600">
        Brunch, specials, and good vibes in Rabat.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/menu" className="px-6 py-3 bg-brand-red text-white rounded-lg">
          View Menu
        </Link>
        <Link href="/gallery" className="px-6 py-3 border border-brand-red text-brand-red rounded-lg">
          Explore Gallery
        </Link>
      </div>
    </section>
  );
}
