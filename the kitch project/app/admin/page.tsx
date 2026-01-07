'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { MenuItem } from '@/types/menu';
import MenuEditor from '@/components/admin/MenuEditor';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('menu');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Login error:', error);
      alert('Erreur de connexion');
    }
  };

  if (loading) return <div>Chargement...</div>;
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center">Admin The Kitch</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">Tableau de Bord - The Kitch</h1>
            <button
              onClick={() => signOut(auth)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-2 px-1 ${activeTab === 'menu' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
            >
              📋 Gestion du Menu
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 ${activeTab === 'analytics' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
            >
              📊 Analytics
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`py-2 px-1 ${activeTab === 'ai' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'}`}
            >
              🤖 Assistant IA
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'menu' && <MenuEditor />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'ai' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Assistant IA pour Marketing</h2>
              <p className="text-gray-600">
                Cette fonctionnalité génère automatiquement des descriptions attractives pour vos plats,
                suggère des tags basés sur les ingrédients, et analyse les préférences des clients.
              </p>
              {/* We'll implement this in Phase 2 */}
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                Générer des Descriptions IA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}