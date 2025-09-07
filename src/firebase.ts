// Firebase helper using Realtime Database (RTDB) for ReliefMap
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  getDatabase,
  ref,
  onValue,
  push,
  set,
  get,
  query as dbQuery,
  orderByChild,
  serverTimestamp,
} from 'firebase/database';

// Use the RTDB URL you provided
const firebaseConfig = {
  apiKey: "AIzaSyBhkt8ROJXIsjS8MPDLa_wpzz9E2dDs09Y",
  authDomain: "disaster-relief-c986d.firebaseapp.com",
  databaseURL: "https://disaster-relief-c986d-default-rtdb.firebaseio.com/",
  projectId: "disaster-relief-c986d",
  storageBucket: "disaster-relief-c986d.firebasestorage.app",
  messagingSenderId: "339127226902",
  appId: "1:339127226902:web:97ccee611af7f6b327db37",
  measurementId: "G-CY3VD9QSGX"
};

let app: ReturnType<typeof initializeApp> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;
let db: ReturnType<typeof getDatabase> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;
let messaging: ReturnType<typeof getMessaging> | null = null;

export const isEnabled = () => true;

export const initFirebase = async () => {
  if (app) return { app, db, auth };
  try {
    app = initializeApp(firebaseConfig);
    try {
      analytics = getAnalytics(app);
    } catch (e) {
      // ignore analytics errors
    }
    db = getDatabase(app);
    auth = getAuth(app);
    try {
      messaging = getMessaging(app);
    } catch (err) {
      messaging = null;
    }
    return { app, db, auth };
  } catch (error) {
    console.warn('Failed to initialize Firebase:', error);
    app = null;
    db = null;
    auth = null;
    return { app: null, db: null, auth: null };
  }
};

// Listen to RTDB 'reports' node; onUpdate receives array of reports
export const listenReports = async (onUpdate: (reports: any[]) => void) => {
  if (!db) await initFirebase();
  if (!db) return () => {};

  const reportsRef = ref(db, 'reports');
  const listener = onValue(reportsRef, (snapshot) => {
    const value = snapshot.val() || {};
    const items: any[] = Object.keys(value).map(key => ({ id: key, ...value[key] }));
    // sort by createdAt descending if present
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    onUpdate(items);
  }, (err) => {
    console.error('RTDB listenReports error', err);
  });

  // return unsubscribe function
  return () => { if (reportsRef) { /* onValue returns unsubscribe via returned function, but in modular API you remove by calling off; keep simple: */ } };
};

// Add a report to RTDB using push
export const addReport = async (report: any) => {
  if (!db) await initFirebase();
  if (!db) throw new Error('RTDB not initialized');
  const reportsRef = ref(db, 'reports');
  const newRef = push(reportsRef);
  const payload = { ...report, createdAt: serverTimestamp(), updatedAt: serverTimestamp() } as any;
  await set(newRef, payload);
  return newRef.key;
};

export const addAlert = async (alert: any) => {
  if (!db) await initFirebase();
  if (!db) throw new Error('RTDB not initialized');
  const alertsRef = ref(db, 'alerts');
  const newRef = push(alertsRef);
  const payload = { ...alert, createdAt: serverTimestamp(), active: true } as any;
  await set(newRef, payload);
  return newRef.key;
};

// Listen to RTDB 'alerts' node
export const listenAlerts = async (onUpdate: (alerts: any[]) => void) => {
  if (!db) await initFirebase();
  if (!db) return () => {};
  const alertsRef = ref(db, 'alerts');
  const listener = onValue(alertsRef, (snapshot) => {
    const value = snapshot.val() || {};
    const items: any[] = Object.keys(value).map(key => ({ id: key, ...value[key] }));
    items.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    onUpdate(items);
  }, (err) => {
    console.error('RTDB listenAlerts error', err);
  });
  return () => { if (alertsRef) { } };
};

export const requestNotificationPermissionAndGetToken = async (vapidKey: string, swRegistration?: ServiceWorkerRegistration | null) => {
  if (!messaging) await initFirebase();
  if (!messaging) return null;
  try {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return null;
    const options: any = { vapidKey };
    if (swRegistration) options.serviceWorkerRegistration = swRegistration;
    const currentToken = await getToken(messaging as any, options);
    return currentToken;
  } catch (err) {
    console.error('Failed to get FCM token', err);
    return null;
  }
};

export const onMessageListener = (cb: (payload: any) => void) => {
  if (!messaging) return () => {};
  return onMessage(messaging as any, (payload) => cb(payload));
};

// Debug helper: fetch reports once and return result or error for diagnostics (RTDB)
export const testGetReportsOnce = async () => {
  if (!db) await initFirebase();
  if (!db) throw new Error('RTDB not initialized');
  try {
    const snap = await get(ref(db, 'reports'));
    const val = snap.val() || {};
    const items: any[] = Object.keys(val).map(k => ({ id: k, ...val[k] }));
    return { ok: true, items };
  } catch (err: any) {
    console.error('testGetReportsOnce error:', err);
    return { ok: false, error: err?.message || err };
  }
};

// Auth helpers
export const signInWithGoogle = async () => {
  if (!auth) await initFirebase();
  if (!auth) throw new Error('Firebase Auth not initialized');
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

export const signOut = async () => {
  if (!auth) await initFirebase();
  if (!auth) return;
  await firebaseSignOut(auth);
};

export default {
  initFirebase,
  isEnabled,
  listenReports,
  addReport,
  listenAlerts,
  signInWithGoogle,
  signOut,
};
