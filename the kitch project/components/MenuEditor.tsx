'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Eye,
  EyeOff,
  Tag,
  Clock,
  Flame,
  Leaf
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { MenuItem } from '@/types/menu';

const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Tajine Poulet Citron',
    name_ar: 'طاجين الدجاج بالليمون',
    description: 'Poulet mijoté avec citron confit, olives vertes et épices marocaines',
    description_ar: 'دجاج مطهو ببطء مع الليمون المكرمل، الزيتون الأخضر والتوابل المغربية',
    price: 145,
    category: 'plats',
    tags: ['chef-choice', 'traditionnel', 'épicé'],
    imageUrl: '/tajine.jpg',
    available: true,
    aiDescription: 'Un classique revisité avec des citrons confits maison et des olives de Meknès',
    popularityScore: 95,
    ingredients: ['Poulet', 'Citron confit', 'Olives vertes', 'Oignons', 'Épices marocaines'],
    allergens: [],
    preparationTime: 45,
    calories: 420,
    spicyLevel: 1,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Salade The Kitch',
    name_ar: 'سلطة ذا كيتش',
    description: 'Mélange de salades fraîches, noix croquantes, grenade et vinaigrette maison',
    description_ar: 'مزيج من السلطات الطازجة، المكسرات المقرمشة، الرمان وصوص الخل المنزلي',
    price: 85,
    category: 'entrees',
    tags: ['végétarien', 'healthy', 'fresh'],
    imageUrl: '/salad.jpg',
    available: true,
    aiDescription: 'Une explosion de fraîcheur avec des ingrédients de saison et une vinaigrette au miel d\'oranger',
    popularityScore: 78,
    ingredients: ['Salade mixte', 'Noix', 'Grenade', 'Fromage de chèvre', 'Vinaigrette miel'],
    allergens: ['Noix', 'Lait'],
    preparationTime: 15,
    calories: 280,
    spicyLevel: 0,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function MenuEditor() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'Tous les plats' },
    { id: 'entrees', name: 'Entrées' },
    { id: 'plats', name: 'Plats principaux' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'boissons', name: 'Boissons' },
    { id: 'specials', name: 'Spécialités' }
  ];

  const handleSave = (item: MenuItem) => {
    if (editingItem) {
      setMenuItems(prev => prev.map(i => i.id === item.id ? item : i));
      toast.success('Plat mis à jour avec succès');
    } else {
      const newItem = { ...item, id: Date.now().toString() };
      setMenuItems(prev => [...prev, newItem]);
      toast.success('Nouveau plat ajouté');
    }
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce plat?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast.success('Plat supprimé');
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">📋 Gestion du Menu</h2>
          <p className="text-gray-600">Gérez votre menu en temps réel. Les modifications sont visibles immédiatement.</p>
        </div>
        <button
          onClick={() => {
            setIsAddingNew(true);
            setEditingItem({
              id: '',
              name: '',
              name_ar: '',
              description: '',
              description_ar: '',
              price: 0,
              category: 'plats',
              tags: [],
              imageUrl: '',
              available: true,
              popularityScore: 0,
              ingredients: [],
              allergens: [],
              preparationTime: 30,
              spicyLevel: 0,
              isVegetarian: false,
              isVegan: false,
              isGlutenFree: false,
              createdAt: new Date(),
              updatedAt: new Date()
            });
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Ajouter un plat
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-primary-600">{menuItems.length}</div>
          <div className="text-sm text-gray-600">Plats au total</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-green-600">{menuItems.filter(i => i.available).length}</div>
          <div className="text-sm text-gray-600">Disponibles</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(menuItems.reduce((acc, item) => acc + item.popularityScore, 0) / menuItems.length)}%
          </div>
          <div className="text-sm text-gray-600">Popularité moyenne</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-2xl font-bold text-yellow-600">
            {Math.round(menuItems.reduce((acc, item) => acc + item.price, 0) / menuItems.length)} DH
          </div>
          <div className="text-sm text-gray-600">Prix moyen</div>
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plat
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Popularité
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full object-cover" src={item.imageUrl} alt={item.name} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.description.substring(0, 50)}...</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {item.price} DH
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-500 h-2 rounded-full" 
                          style={{ width: `${item.popularityScore}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{item.popularityScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.available ? 'Disponible' : 'Indisponible'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setMenuItems(prev => prev.map(i => 
                            i.id === item.id ? { ...i, available: !i.available } : i
                          ));
                          toast.success(`Plat ${item.available ? 'masqué' : 'affiché'}`);
                        }}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        {item.available ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      {(editingItem || isAddingNew) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">
                  {editingItem?.id ? 'Modifier le plat' : 'Ajouter un nouveau plat'}
                </h3>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setIsAddingNew(false);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (editingItem) handleSave(editingItem);
              }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* French Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom (Français)
                    </label>
                    <input
                      type="text"
                      value={editingItem?.name || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, name: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>

                  {/* Arabic Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom (Arabe)
                    </label>
                    <input
                      type="text"
                      value={editingItem?.name_ar || ''}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, name_ar: e.target.value } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 arabic-text"
                      dir="rtl"
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (DH)
                    </label>
                    <input
                      type="number"
                      value={editingItem?.price || 0}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, price: parseFloat(e.target.value) } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Catégorie
                    </label>
                    <select
                      value={editingItem?.category || 'plats'}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, category: e.target.value as any } : null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="entrees">Entrées</option>
                      <option value="plats">Plats principaux</option>
                      <option value="desserts">Desserts</option>
                      <option value="boissons">Boissons</option>
                      <option value="specials">Spécialités</option>
                    </select>
                  </div>

                  {/* Preparation Time */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Temps de préparation (min)
                    </label>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="number"
                        value={editingItem?.preparationTime || 30}
                        onChange={(e) => setEditingItem(prev => prev ? { ...prev, preparationTime: parseInt(e.target.value) } : null)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                        min="1"
                        max="120"
                      />
                    </div>
                  </div>

                  {/* Spicy Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Niveau d&apos;épice
                    </label>
                    <div className="flex items-center space-x-4">
                      {[0, 1, 2, 3].map(level => (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setEditingItem(prev => prev ? { ...prev, spicyLevel: level as any } : null)}
                          className={`flex items-center px-3 py-2 rounded-lg ${
                            editingItem?.spicyLevel === level
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <Flame className="w-4 h-4 mr-2" />
                          {level === 0 ? 'Doux' : level === 1 ? 'Léger' : level === 2 ? 'Moyen' : 'Fort'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Tag className="w-4 h-4 inline mr-2" />
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['chef-choice', 'végétarien', 'vegan', 'sans gluten', 'épicé', 'nouveau', 'healthy', 'traditionnel'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const currentTags = editingItem?.tags || [];
                          const newTags = currentTags.includes(tag)
                            ? currentTags.filter(t => t !== tag)
                            : [...currentTags, tag];
                          setEditingItem(prev => prev ? { ...prev, tags: newTags } : null);
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          editingItem?.tags?.includes(tag)
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary Info */}
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem?.isVegetarian || false}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, isVegetarian: e.target.checked } : null)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 flex items-center">
                      <Leaf className="w-4 h-4 mr-1" />
                      Végétarien
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem?.isVegan || false}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, isVegan: e.target.checked } : null)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2">Vegan</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem?.isGlutenFree || false}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, isGlutenFree: e.target.checked } : null)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2">Sans gluten</span>
                  </label>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Français)
                  </label>
                  <textarea
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, description: e.target.value } : null)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>

                {/* AI Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description IA (optionnel)
                  </label>
                  <textarea
                    value={editingItem?.aiDescription || ''}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, aiDescription: e.target.value } : null)}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Description générée par IA pour le marketing"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Upload className="w-4 h-4 inline mr-2" />
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={editingItem?.imageUrl || ''}
                    onChange={(e) => setEditingItem(prev => prev ? { ...prev, imageUrl: e.target.value } : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingItem?.available || true}
                      onChange={(e) => setEditingItem(prev => prev ? { ...prev, available: e.target.checked } : null)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2">Disponible à la vente</span>
                  </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingItem(null);
                      setIsAddingNew(false);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {editingItem?.id ? 'Mettre à jour' : 'Ajouter le plat'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
