'use client';

import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface GenerationResponse {
  description: string;
  language: string;
  generatedAt: string;
  model: string;
}

export default function AIContentGenerator() {
  const [dishName, setDishName] = useState('');
  const [category, setCategory] = useState('plats');
  const [ingredients, setIngredients] = useState('');
  const [language, setLanguage] = useState('fr');
  const [result, setResult] = useState<GenerationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dishName,
          category,
          ingredients: ingredients.split(',').map((item) => item.trim()).filter(Boolean),
          language
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">AI Content Generator</h2>
        <p className="text-gray-600">Créez des descriptions marketing cohérentes et multilingues.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nom du plat</label>
          <input
            type="text"
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Ex: Tajine Poulet Citron"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="entrees">Entrées</option>
            <option value="plats">Plats principaux</option>
            <option value="desserts">Desserts</option>
            <option value="boissons">Boissons</option>
            <option value="specials">Spécialités</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ingrédients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
            placeholder="Poulet, citron confit, olives"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Langue</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={!dishName || loading}
        className="btn-primary flex items-center gap-2"
      >
        <Sparkles className="w-5 h-5" />
        {loading ? 'Génération en cours...' : 'Générer la description'}
      </button>

      {result && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-gray-700 whitespace-pre-line">{result.description}</p>
          <div className="text-xs text-gray-500 mt-2">
            Modèle: {result.model} · {new Date(result.generatedAt).toLocaleString('fr-MA')}
          </div>
        </div>
      )}
    </div>
  );
}
