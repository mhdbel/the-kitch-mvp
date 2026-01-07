import { NextRequest, NextResponse } from 'next/server';
import { db, collections } from '@/lib/firebase';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today';
    
    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    
    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    // Fetch orders
    const ordersRef = collection(db, collections.orders);
    const q = query(
      ordersRef,
      where('createdAt', '>=', Timestamp.fromDate(startDate))
    );
    
    const ordersSnapshot = await getDocs(q);
    const orders = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Calculate metrics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order: any) => sum + (order.total || 0), 0);
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Popular items
    const itemCount: Record<string, number> = {};
    orders.forEach((order: any) => {
      order.items?.forEach((item: any) => {
        itemCount[item.menuItemId] = (itemCount[item.menuItemId] || 0) + item.quantity;
      });
    });

    const popularItems = Object.entries(itemCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, count]) => ({ id, count }));

    // Delivery zones
    const zoneCount: Record<string, number> = {};
    orders.forEach((order: any) => {
      if (order.deliveryZone) {
        zoneCount[order.deliveryZone] = (zoneCount[order.deliveryZone] || 0) + 1;
      }
    });

    // Time distribution
    const hourlyOrders = Array(24).fill(0);
    orders.forEach((order: any) => {
      if (order.createdAt) {
        const hour = new Date(order.createdAt.toDate()).getHours();
        hourlyOrders[hour]++;
      }
    });

    return NextResponse.json({
      period,
      totalOrders,
      totalRevenue,
      averageOrderValue,
      popularItems,
      zoneCount,
      hourlyOrders,
      updatedAt: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Analytics API error:', error);
    
    return NextResponse.json({
      error: 'Failed to fetch analytics',
      message: error.message,
    }, { status: 500 });
  }
}