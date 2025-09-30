import Image from "next/image";

const images = ["/gallery1.jpg", "/gallery2.jpg", "/gallery3.jpg"];

export default function GalleryPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {images.map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Gallery image ${i + 1}`}
            width={400}
            height={300}
            className="rounded-lg object-cover"
          />
        ))}
      </div>
    </main>
  );
}
