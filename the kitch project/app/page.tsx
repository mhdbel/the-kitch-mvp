'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Clock, MapPin, Shield, Truck, Users, Award } from 'lucide-react';
import MenuSection from '@/components/MenuSection';
import HeroSection from '@/components/HeroSection';
import RabatFeatures from '@/components/RabatFeatures';
import Testimonials from '@/components/Testimonials';
import BusinessSolutions from '@/components/BusinessSolutions';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* AI-Powered Features */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50">
        <div className="container-max section-padding">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full mb-4"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold">SYSTÈME INTELLIGENT</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Une <span className="gradient-text">expérience culinaire</span> optimisée par l'IA
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre technologie avancée révolutionne votre expérience gastronomique à Rabat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rabat-Specific Features */}
      <RabatFeatures />

      {/* Interactive Menu */}
      <MenuSection />

      {/* Business Solutions */}
      <BusinessSolutions />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container-max section-padding text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à transformer votre expérience culinaire ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez les centaines de clients satisfaits qui utilisent notre système intelligent
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-white text-green-600 hover:bg-gray-100 px-8">
                Commander Maintenant
              </button>
              <button className="btn-secondary border-white text-white hover:bg-white/10">
                Voir la Démo IA
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Clock,
    title: 'Recommandations Intelligentes',
    description: 'Notre IA analyse vos préférences pour suggérer des plats parfaitement adaptés',
  },
  {
    icon: Truck,
    title: 'Livraison Optimisée',
    description: 'Algorithmes intelligents pour des livraisons plus rapides dans tout Rabat',
  },
  {
    icon: Shield,
    title: 'Sécurité Avancée',
    description: 'Paiements sécurisés et protection des données personnelles',
  },
  {
    icon: Users,
    title: 'Service Personnalisé',
    description: 'Assistant IA disponible 24/7 pour répondre à toutes vos questions',
  },
];
