import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import './globals.css';
import ChatWidget from '@/components/ChatWidget';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: 'The Kitch Rabat | Cuisine d\'excellence au cœur de Rabat',
  description: 'Restaurant premium à Rabat. Cuisine marocaine moderne, livraison express dans tout Rabat, formules professionnelles pour entreprises.',
  keywords: 'Rabat restaurant, livraison Rabat, cuisine marocaine, Hassan Tower, déjeuner d\'affaires, traiteur Rabat',
  authors: [{ name: 'The Kitch Rabat' }],
  openGraph: {
    title: 'The Kitch Rabat - Cuisine d\'excellence',
    description: 'Restaurant premium au cœur de Rabat',
    type: 'website',
    locale: 'fr_MA',
    siteName: 'The Kitch Rabat',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${cairo.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
        <ChatWidget />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#10b981',
              color: '#fff',
              fontFamily: 'var(--font-inter)',
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}
