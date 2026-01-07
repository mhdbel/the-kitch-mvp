import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';

// Menu operations
export const menuCollection = collection(db, 'menu');
export const categoriesCollection = collection(db, 'categories');
export const ordersCollection = collection(db, 'orders');
export const analyticsCollection = collection(db, 'analytics');
export const chatbotCollection = collection(db, 'chatbot_interactions');

// Helper functions
export const getMenuItems = async (category?: string) => {
  let q = query(menuCollection, where('available', '==', true), orderBy('popularityScore', 'desc'));
  if (category) {
    q = query(q, where('category', '==', category));
  }
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getMenuItem = async (id: string) => {
  const docRef = doc(db, 'menu', id);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
};

export const updateMenuItem = async (id: string, data: any) => {
  const docRef = doc(db, 'menu', id);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const logChatbotInteraction = async (data: any) => {
  await addDoc(chatbotCollection, {
    ...data,
    timestamp: serverTimestamp()
  });
};

export const getAnalyticsData = async (startDate: Date, endDate: Date) => {
  const q = query(
    analyticsCollection,
    where('timestamp', '>=', Timestamp.fromDate(startDate)),
    where('timestamp', '<=', Timestamp.fromDate(endDate)),
    orderBy('timestamp', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
};
