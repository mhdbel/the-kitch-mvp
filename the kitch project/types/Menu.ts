export interface MenuItem {
  id: string;
  name: string;
  name_ar?: string;
  description: string;
  description_ar?: string;
  price: number;
  category: 'entrees' | 'plats' | 'desserts' | 'boissons' | 'business-lunch';
  tags: string[];
  imageUrl: string;
  available: boolean;
  aiDescription?: string;
  popularityScore: number;
  ingredients: string[];
  preparationTime: number;
  calories?: number;
  spicyLevel?: 0 | 1 | 2 | 3;
  isChefSpecial: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuCategory {
  id: string;
  name: string;
  name_ar: string;
  description: string;
  icon: string;
  order: number;
}

export interface Order {
  id: string;
  items: Array<{
    menuItemId: string;
    quantity: number;
    price: number;
    notes?: string;
  }>;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  deliveryZone?: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  type: 'delivery' | 'pickup' | 'dine-in';
  paymentMethod: 'cash' | 'card' | 'mobile';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalyticsData {
  date: string;
  orders: number;
  revenue: number;
  averageOrderValue: number;
  popularItems: string[];
}
