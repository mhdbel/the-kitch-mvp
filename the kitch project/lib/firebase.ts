import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

// Firestore collections
export const collections = {
  menu: 'menu',
  orders: 'orders',
  customers: 'customers',
  analytics: 'analytics',
  chatbotConversations: 'chatbot_conversations',
  deliveryZones: 'delivery_zones',
  businessAccounts: 'business_accounts',
};

// Firebase helper functions
export async function getMenuItems() {
  const { collection, getDocs } = await import('firebase/firestore');
  const querySnapshot = await getDocs(collection(db, collections.menu));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateMenuItem(id: string, data: Partial<MenuItem>) {
  const { doc, updateDoc } = await import('firebase/firestore');
  const menuItemRef = doc(db, collections.menu, id);
  await updateDoc(menuItemRef, {
    ...data,
    updatedAt: new Date(),
  });
}
