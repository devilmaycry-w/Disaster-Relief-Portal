importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// Replace with your Firebase config if needed (the app loads config in client)
const firebaseConfig = {
  apiKey: "AIzaSyBhkt8ROJXIsjS8MPDLa_wpzz9E2dDs09Y",
  authDomain: "disaster-relief-c986d.firebaseapp.com",
  projectId: "disaster-relief-c986d",
  storageBucket: "disaster-relief-c986d.firebasestorage.app",
  messagingSenderId: "339127226902",
  appId: "1:339127226902:web:97ccee611af7f6b327db37",
  measurementId: "G-CY3VD9QSGX"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'ReliefMap Alert';
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.message || '',
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
