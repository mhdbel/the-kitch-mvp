'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  ChefHat, 
  DeliveryTruck, 
  Building2, 
  MapPin, 
  Clock, 
  Users,
  Star,
  TrendingUp,
  Brain,
  Smartphone,
  Shield
} from 'lucide-react';
import MenuCard from '@/components/MenuCard';
import { toast } from 'react-hot-toast';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('entrees');
  const [aiFeatures, setAiFeatures] = useState([
    { title: 'Assistant IA 24/7', description: 'Réponses instantanées en français, anglais et darija', icon: Brain, stats: '342 conversations/mois' },
    { title: 'Recommandations Intelligentes', description: 'Suggestions personnalisées selon vos goûts', icon: Sparkles, stats: '+28% de commandes' },
    { title: 'Analytics en Temps Réel', description: 'Suivez vos performances et optimisez votre menu', icon: TrendingUp, stats: '1245 visites/mois' },
    { title: 'Gestion Automatisée', description: 'Menu dynamique, réservations, commandes', icon: Smartphone, stats: '-40% de temps admin' },
  ]);

  const categories = [
    { id: 'entrees', name: 'Entrées', icon: '🥗', count: 8 },
    { id: 'plats', name: 'Plats Principaux', icon: '🍽️', count: 12 },
    { id: 'desserts', name: 'Desserts', icon: '🍰', count: 6 },
    { id: 'boissons', name: 'Boissons', icon: '🍹', count: 10 },
    { id: 'specials', name: 'Spécialités Rabat', icon: '🏛️', count: 5 },
  ];

  const deliveryZones = [
    { zone: 'Hassan / Agdal', time: '30 min', fee: 'Gratuit', color: 'from-green-500 to-green-600' },
    { zone: 'Hay Riad', time: '35 min', fee: '15 DH', color: 'from-blue-500 to-blue-600' },
    { zone: 'Salé Centre', time: '40 min', fee: '20 DH', color: 'from-purple-500 to-purple-600' },
    { zone: 'Témara', time: '50 min', fee: '25 DH', color: 'from-orange-500 to-orange-600' },
  ];

  const businessLunches = [
    { name: 'Formule Executive', price: 145, includes: ['Plat principal', 'Entrée ou dessert', 'Boisson', 'Café'], bestFor: 'Réunions importantes' },
    { name: 'Formule Team', price: 120, includes: ['Plat principal', 'Boisson', 'Dessert'], bestFor: 'Déjeuners d\'équipe' },
    { name: 'Formule Traiteur', price: 450, includes: ['Buffet pour 4', 'Boissons', 'Service complet'], bestFor: 'Événements d\'entreprise' },
  ];

  const testimonials = [
    { name: 'Ahmed B.', role: 'Manager, Agdal Business Center', text: 'L\'assistant IA a révolutionné nos commandes de groupe. Gain de temps incroyable!', rating: 5 },
    { name: 'Sophie M.', role: 'Expatriée française', text: 'Je commande toujours via le chatbot. Les recommandations sont parfaites!', rating: 5 },
    { name: 'Youssef A.', role: 'Entrepreneur, Hay Riad', text: 'Le dashboard analytics m\'aide à comprendre mes clients et optimiser mes commandes.', rating: 4 },
  ];

  const handleWhatsAppOrder = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+212661112233';
    const message = encodeURIComponent('Bonjour The Kitch Rabat ! Je souhaite commander via votre site AI.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    toast.success('Ouverture WhatsApp pour votre commande!');
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-primary-400/10 to-accent-500/20"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container-custom section-padding relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* AI Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold text-white">🤖 PREMIER RESTAURANT AI-POWERED DE RABAT</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">The Kitch</span>
              <br />
              <span className="text-gray-800">Expérience Culinaire</span>
              <span className="text-gradient ml-4">Intelligente</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Cuisine marocaine moderne au cœur de Rabat, 
              <span className="text-primary-600 font-semibold"> augmentée par l&apos;IA</span> pour une expérience 
              personnalisée et un service exceptionnel.
            </p>

            {/* Stats Bar */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">30min</div>
                <div className="text-sm text-gray-500">Livraison moyenne</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">4.8★</div>
                <div className="text-sm text-gray-500">Satisfaction clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">89%</div>
                <div className="text-sm text-gray-500">Commandes via IA</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600">1245</div>
                <div className="text-sm text-gray-500">Visites/mois</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsAppOrder}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <span>💬 Commander via WhatsApp</span>
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <span>🍽️ Explorer le Menu AI</span>
              </button>
              <a 
                href="/admin" 
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                <span>Dashboard Admin</span>
              </a>
            </div>

            {/* Location Badge */}
            <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <MapPin className="w-5 h-5 text-primary-600" />
              <span className="font-medium">📍 Avenue Mohammed V, Rabat (près de Hassan Tower)</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-primary-500 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-primary-500 rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Système <span className="text-gradient">AI-Powered</span> pour Restaurants
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez comment nous transformons l&apos;expérience restaurant avec l&apos;intelligence artificielle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-2xl hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 gradient-primary rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="text-sm font-medium text-primary-600">{feature.stats}</div>
              </motion.div>
            ))}
          </div>

          {/* Live Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-16 glass-card rounded-2xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="lg:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">💬 Essayez Notre Assistant IA</h3>
                  <p className="text-gray-600 mb-6">
                    Notre chatbot comprend le contexte, vos préférences et le menu. 
                    Il parle français, anglais et arabe marocain.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Réponses en temps réel</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Recommandations personnalisées</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Gestion des réservations</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Support 24/7</span>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/2">
                  <div className="bg-gray-900 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="text-gray-300 ml-auto">KitchBot AI</div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-end">
                        <div className="bg-green-500 text-white rounded-2xl rounded-br-none p-3 max-w-[80%]">
                          Bonjour! Quels sont vos plats végétariens?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-gray-800 text-gray-100 rounded-2xl rounded-bl-none p-3 max-w-[80%]">
                          Nous avons plusieurs options végétariennes! 🥗
                          Je recommande notre Tajine de Légumes de Saison (145 DH) ou la Pastilla Végétarienne (135 DH).
                        </div>
                      </div>
                      <div className="text-center text-sm text-gray-400">
                        ... conversation en direct avec l&apos;assistant IA
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="container-custom section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Menu <span className="text-gradient">Dynamique & Intelligent</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Notre menu s&apos;adapte en temps réel. Les descriptions sont générées par IA et les recommandations sont personnalisées.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'gradient-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
                <span className="text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <MenuCard category={activeCategory as any} />

          {/* AI Menu Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-primary-50 rounded-2xl">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Descriptions Générées par IA</h4>
              <p className="text-gray-600">
                Chaque plat a une description unique créée par notre système IA
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-primary-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Recommandations Intelligentes</h4>
              <p className="text-gray-600">
                Suggestions basées sur vos préférences et les tendances
              </p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-primary-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-xl font-bold mb-2">Mise à Jour en Temps Réel</h4>
              <p className="text-gray-600">
                Le menu se met à jour automatiquement selon la disponibilité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rabat Delivery Zones */}
      <section id="delivery" className="py-20 bg-gradient-to-br from-gray-50 to-primary-50">
        <div className="container-custom section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              🛵 Livraison <span className="text-gradient">Intelligente Rabat</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Notre système optimise les livraisons en temps réel dans toute la région de Rabat
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {deliveryZones.map((zone) => (
              <div key={zone.zone} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${zone.color}`}></div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">{zone.zone}</h3>
                    <div className="text-2xl font-bold text-primary-600">{zone.time}</div>
                  </div>
                  <div className="text-gray-600 mb-4">
                    Livraison moyenne dans ce quartier
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Frais de livraison</span>
                    <span className="font-bold text-lg">{zone.fee}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Live Delivery Map */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">🗺️ Carte des Livraisons en Temps Réel</h3>
              <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl relative overflow-hidden">
                {/* Simplified Rabat Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Hassan/Agdal */}
                    <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-green-500/20 rounded-full border-2 border-green-500 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-bold">Hassan</div>
                        <div className="text-xs">5 livraisons</div>
                      </div>
                    </div>
                    {/* Hay Riad */}
                    <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-500/20 rounded-full border-2 border-blue-500 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-bold">Hay Riad</div>
                        <div className="text-xs">3 livraisons</div>
                      </div>
                    </div>
                    {/* Salé */}
                    <div className="absolute bottom-1/4 left-1/3 w-18 h-18 bg-purple-500/20 rounded-full border-2 border-purple-500 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-bold">Salé</div>
                        <div className="text-xs">2 livraisons</div>
                      </div>
                    </div>
                    {/* The Kitch Location */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                        <span className="text-white font-bold">K</span>
                      </div>
                      <div className="text-center mt-2 font-bold">The Kitch Rabat</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">Livraisons actives</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">32min</div>
                  <div className="text-sm text-gray-600">Temps moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">98%</div>
                  <div className="text-sm text-gray-600">À l&apos;heure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Solutions */}
      <section id="business" className="py-20 bg-white">
        <div className="container-custom section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              🏢 Solutions <span className="text-gradient">Entreprises Rabat</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Services premium pour les professionnels de la zone Hassan/Agdal
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {businessLunches.map((lunch) => (
              <div key={lunch.name} className="glass-card rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold">{lunch.name}</h3>
                    <div className="text-3xl font-bold text-primary-600">{lunch.price}<span className="text-lg"> DH</span></div>
                  </div>
                  <div className="mb-6">
                    <div className="text-gray-600 mb-3">Inclus:</div>
                    <ul className="space-y-2">
                      {lunch.includes.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-3">Idéal pour:</div>
                    <div className="font-semibold text-primary-600">{lunch.bestFor}</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4 text-center">
                  <button className="font-bold hover:opacity-90 transition-opacity">
                    📋 Commander pour mon équipe
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Dashboard Preview */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6">📊 Dashboard Entreprise</h3>
              <p className="text-gray-600 mb-8">
                Gestion centralisée des commandes de votre entreprise, facturation unique, et analytics détaillés.
              </p>
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-gray-300 ml-auto">Entreprise Dashboard - ABC Corp</div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Commandes ce mois</div>
                    <div className="text-2xl font-bold text-white">42</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Dépense totale</div>
                    <div className="text-2xl font-bold text-white">5,240 DH</div>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-400">Économies</div>
                    <div className="text-2xl font-bold text-green-400">1,050 DH</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <button className="text-primary-400 hover:text-primary-300 text-sm">
                    Voir le dashboard complet →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom section-padding">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Ce que disent nos clients <span className="text-gradient">Rabat</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Découvrez comment notre système AI transforme l&apos;expérience restaurant
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-2xl"
              >
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container-custom section-padding">
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à transformer votre restaurant avec l&apos;IA?
            </h2>
            <p className="text-xl mb-10 opacity-90">
              The Kitch Rabat est plus qu&apos;un restaurant. C&apos;est une plateforme technologique qui démontre la puissance de l&apos;IA dans l&apos;hôtellerie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleWhatsAppOrder}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <span>💬 Commander maintenant</span>
              </button>
              <a 
                href="mailto:contact@thekitch.ma?subject=Demande%20d'information%20système%20AI" 
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition-colors"
              >
                📧 Demander une démo
              </a>
            </div>
            <p className="mt-8 text-sm opacity-75">
              Ce site est une démonstration live d&apos;un système restaurant AI-powered. 
              <br />
              Pour implémenter cette technologie dans votre établissement, contactez-nous.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
