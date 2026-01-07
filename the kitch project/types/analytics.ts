export interface VisitData {
  timestamp: Date;
  page: string;
  device: 'mobile' | 'desktop' | 'tablet';
  location?: string;
  language: string;
  duration: number;
}

export interface ChatbotInteraction {
  id: string;
  timestamp: Date;
  message: string;
  response: string;
  intent: string;
  language: string;
  sessionId: string;
  wasHelpful?: boolean;
  convertedToOrder: boolean;
  orderId?: string;
}

export interface OrderAnalytics {
  date: Date;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  peakHour: string;
  mostPopularItem: string;
  deliveryZones: Record<string, number>;
}

export interface UserPreference {
  userId: string;
  preferredLanguage: string;
  dietaryRestrictions: string[];
  favoriteCategories: string[];
  averageSpend: number;
  visitFrequency: number;
  lastVisit: Date;
}
