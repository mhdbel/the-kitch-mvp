'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Accueil', href: '/' },
    { label: 'Menu', href: '#menu' },
    { label: 'Livraison Rabat', href: '#delivery' },
    { label: 'Entreprises', href: '#business' },
    { label: 'Notre Histoire', href: '#story' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg py-3' 
        : 'bg-white/90 backdrop-blur-sm py-5'
      }
    `}>
      <div className="container-max section-padding">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                The Kitch
              </h1>
              <p className="text-xs text-gray-500 font-medium">Rabat • AI-Powered</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
            
            <div className="flex items-center space-x-4">
              <button className="btn-primary">
                Commander
              </button>
              
              <button className="p-2 text-gray-600 hover:text-green-600">
                <ShoppingCart className="w-5 h-5" />
              </button>
              
              <Link 
                href="/admin" 
                className="p-2 text-gray-600 hover:text-green-600"
                title="Espace Pro"
              >
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-green-600"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="pt-4 pb-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-2 text-gray-700 hover:text-green-600 font-medium"
                  >
                    {item.label}
                  </a>
                ))}
                
                <div className="pt-4 border-t space-y-3">
                  <button className="w-full btn-primary">
                    Commander Maintenant
                  </button>
                  
                  <Link 
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-2 text-gray-600 hover:text-green-600"
                  >
                    Espace Professionnel
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
