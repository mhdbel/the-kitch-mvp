'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface OrderItem {
  id: string;
  customerName: string;
  total: number;
  status: string;
  type: string;
  createdAt?: Date;
}

const demoOrders: OrderItem[] = [
  { id: 'D-1024', customerName: 'Imane', total: 220, status: 'preparing', type: 'delivery', createdAt: new Date() },
  { id: 'D-1025', customerName: 'Karim', total: 145, status: 'confirmed', type: 'pickup', createdAt: new Date() },
  { id: 'D-1026', customerName: 'Salma', total: 310, status: 'delivered', type: 'delivery', createdAt: new Date() }
];

export default function OrdersManager() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<'firestore' | 'demo'>('demo');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'orders'));
        if (snapshot.empty) {
          setOrders(demoOrders);
          setDataSource('demo');
        } else {
          const items: OrderItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: docSnap.id,
              customerName: data.customerName ?? 'Client',
              total: data.total ?? 0,
              status: data.status ?? 'pending',
              type: data.type ?? 'delivery',
              createdAt: data.createdAt?.toDate?.()
            };
          });
          setOrders(items);
          setDataSource('firestore');
        }
      } catch (error) {
        console.error('Orders fetch error:', error);
        setOrders(demoOrders);
        setDataSource('demo');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Chargement des commandes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Commandes</h2>
        <span className="text-sm text-gray-500">
          {dataSource === 'firestore' ? 'Synchronisé Firebase' : 'Mode démo'}
        </span>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Heure</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{order.customerName}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{order.total} DH</td>
                <td className="px-4 py-3 text-sm text-gray-700">{order.type}</td>
                <td className="px-4 py-3 text-sm text-gray-700">{order.status}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {order.createdAt ? order.createdAt.toLocaleTimeString('fr-MA', { hour: '2-digit', minute: '2-digit' }) : '--'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
