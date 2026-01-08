'use client';

import { useEffect, useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AnalyticsDashboardProps {
  detailed?: boolean;
}

interface AnalyticsResponse {
  period: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularItems: Array<{ id: string; count: number }>;
  zoneCount: Record<string, number>;
  hourlyOrders: number[];
  updatedAt: string;
}

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444', '#14b8a6'];

const demoAnalytics: AnalyticsResponse = {
  period: 'today',
  totalOrders: 18,
  totalRevenue: 2780,
  averageOrderValue: 154,
  popularItems: [
    { id: 'Tajine Poulet Citron', count: 6 },
    { id: 'Pastilla au Poulet', count: 4 },
    { id: 'Salade The Kitch', count: 3 }
  ],
  zoneCount: {
    Hassan: 6,
    Agdal: 5,
    HayRiad: 4,
    Sale: 3
  },
  hourlyOrders: [0, 0, 0, 0, 0, 1, 1, 2, 2, 3, 2, 3, 4, 3, 2, 2, 1, 2, 3, 2, 1, 1, 0, 0],
  updatedAt: new Date().toISOString()
};

export default function AnalyticsDashboard({ detailed }: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics?period=week');
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const payload: AnalyticsResponse = await response.json();
        setData(payload);
      } catch (error) {
        console.error('Analytics fetch error:', error);
        setData(demoAnalytics);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const hourlyData = useMemo(() => {
    const source = data?.hourlyOrders?.length ? data.hourlyOrders : demoAnalytics.hourlyOrders;
    return source.map((value, hour) => ({ hour: `${hour}h`, value }));
  }, [data]);

  const zoneData = useMemo(() => {
    const zones = data?.zoneCount && Object.keys(data.zoneCount).length ? data.zoneCount : demoAnalytics.zoneCount;
    return Object.entries(zones).map(([name, value]) => ({ name, value }));
  }, [data]);

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Chargement des analytics...</div>;
  }

  const stats = data ?? demoAnalytics;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
          <p className="text-sm text-green-700">Commandes</p>
          <p className="text-3xl font-bold text-green-900">{stats.totalOrders}</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-sm text-blue-700">Revenus</p>
          <p className="text-3xl font-bold text-blue-900">{stats.totalRevenue} DH</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
          <p className="text-sm text-purple-700">Panier moyen</p>
          <p className="text-3xl font-bold text-purple-900">{Math.round(stats.averageOrderValue)} DH</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 border rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Flux horaire</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 border rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Zones de livraison</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={zoneData} dataKey="value" nameKey="name" outerRadius={90}>
                  {zoneData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {detailed && (
        <div className="p-6 border rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Articles populaires</h3>
          <div className="grid gap-3">
            {stats.popularItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <span className="text-gray-700">{item.id}</span>
                <span className="font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-400">Dernière mise à jour: {new Date(stats.updatedAt).toLocaleString('fr-MA')}</p>
    </div>
  );
}
