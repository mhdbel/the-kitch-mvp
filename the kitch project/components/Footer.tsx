import { Facebook, Instagram, Phone, Mail, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container-max section-padding py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🍽️</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">The Kitch</h2>
                <p className="text-green-400 text-sm">Rabat • AI-Powered</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Cuisine d'excellence au cœur de Rabat. Notre système intelligent 
              révolutionne votre expérience culinaire.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Rapide</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <a href="tel:+212661234567" className="text-gray-400 hover:text-white transition">
                    +212 661 234 567
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:contact@thekitch.ma" className="text-gray-400 hover:text-white transition">
                    contact@thekitch.ma
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-gray-400">Avenue Mohammed V, Rabat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6">Horaires</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Lundi - Vendredi</span>
                <span className="font-medium">12h - 23h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Samedi</span>
                <span className="font-medium">12h - 00h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Dimanche</span>
                <span className="font-medium">12h - 22h</span>
              </div>
            </div>
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-green-400 mr-2" />
                <span className="text-sm text-gray-400">Livraison express 30-45min dans Rabat</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Liens Rapides</h3>
            <div className="space-y-3">
              {[
                { label: 'Notre Menu AI', href: '#menu' },
                { label: 'Livraison Rabat', href: '#delivery' },
                { label: 'Formules Entreprises', href: '#business' },
                { label: 'Événements', href: '#events' },
                { label: 'Carrières', href: '#careers' },
                { label: 'Blog Culinaire', href: '#blog' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block text-gray-400 hover:text-white transition hover:translate-x-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2024 The Kitch Rabat. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-500 hover:text-white text-sm">
                Confidentialité
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white text-sm">
                Conditions
              </Link>
              <Link href="/admin" className="text-green-400 hover:text-green-300 text-sm font-medium">
                Espace Pro
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
