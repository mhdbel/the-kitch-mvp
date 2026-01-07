export interface AdminUser {
  uid: string;
  email: string;
  role: 'owner' | 'manager' | 'staff';
  permissions: string[];
  lastLogin: Date;
  createdAt: Date;
}

export interface SystemAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  priority: number;
  createdAt: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: Date;
}

export interface BusinessHour {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday
  opening: string; // "09:00"
  closing: string; // "23:00"
  isClosed: boolean;
  specialHours?: string;
}
