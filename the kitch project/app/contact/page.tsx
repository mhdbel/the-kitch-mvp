export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Contact & Location</h1>
      <p className="mb-4">📍 Rabat, Morocco</p>
      <p className="mb-4">🕒 Open daily 9:00 – 18:00</p>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18..."
        width="100%"
        height="300"
        className="rounded-lg border"
        loading="lazy"
      ></iframe>
    </main>
  );
}
