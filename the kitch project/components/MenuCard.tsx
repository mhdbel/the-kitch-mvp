'use client';

import { useEffect, useState } from 'react';
import { MenuItem } from '@/types/menu';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface MenuCardProps {
  category: 'entrees' | 'plats' | 'desserts' | 'boissons';
}

export default function MenuCard({ category }: MenuCardProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'menu'));
        const items: MenuItem[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.category === category && data.available) {
            items.push({ id: doc.id, ...data } as MenuItem);
          }
        });
        // Sort by popularity score (descending)
        items.sort((a, b) => b.popularityScore - a.popularityScore);
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [category]);

  if (loading) {
    return <div className="text-center py-8">Chargement du menu...</div>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-48">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            {item.tags.includes('chef-choice') && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm">
                👨‍🍳 Choix du Chef
              </span>
            )}
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <span className="text-lg font-semibold text-green-600">
                {item.price.toFixed(2)} DH
              </span>
            </div>
            <p className="text-gray-600 mt-2">{item.description}</p>
            
            {/* AI-Generated Description (if exists) */}
            {item.aiDescription && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-800 italic">💡 AI Insight: {item.aiDescription}</p>
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Quick Action - Add to Order via WhatsApp */}
            <a
              href={`https://wa.me/212XXXXXXXXX?text=Bonjour! Je souhaite commander: ${item.name} - ${item.price}DH`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-300"
            >
              <span>Commander via WhatsApp</span>
              <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 0a10 10 0 1010 10A10 10 0 0010 0zm5.26 7.33l-2.26 2.26a.83.83 0 01-1.16 0l-1.06-1.06a.83.83 0 010-1.16l2.26-2.26a.83.83 0 011.16 0l1.06 1.06a.83.83 0 010 1.16zM6.67 13.43a.83.83 0 01-1.16 0l-1.06-1.06a.83.83 0 010-1.16l2.26-2.26a.83.83 0 011.16 0l1.06 1.06a.83.83 0 010 1.16z"/>
              </svg>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
