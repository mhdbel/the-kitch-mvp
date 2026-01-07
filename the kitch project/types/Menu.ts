export interface MenuItem {
  id: string;
  name: string;
  name_ar?: string; // For Arabic display
  description: string;
  description_ar?: string;
  price: number;
  category: 'entrees' | 'plats' | 'desserts' | 'boissons';
  tags: string[]; // ['vegetarian', 'spicy', 'chef-choice', 'gluten-free']
  imageUrl: string;
  available: boolean;
  aiDescription?: string; // AI-generated description for marketing
  popularityScore: number; // For recommendations
  ingredients: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}