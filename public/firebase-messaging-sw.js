importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.0/firebase-messaging-compat.js');

// Service worker for Firebase Cloud Messaging
// Note: Firebase config is handled by the main app, not the service worker
// This prevents API key exposure in publicly accessible files

// Initialize Firebase with minimal config (keys are managed by main app)
const firebaseConfig = {
  // Config will be passed from main app via postMessage if needed
  // For now, we'll handle messages without full initialization
};

let messaging = null;

try {
  // Only initialize if we have proper config (which we don't expose)
  if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
    messaging = firebase.messaging();
  }
} catch (error) {
  console.log('Firebase SW initialization skipped (config not available)');
}

// Handle background messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'FIREBASE_CONFIG') {
    // If main app sends config, we can initialize here
    try {
      firebase.initializeApp(event.data.config);
      messaging = firebase.messaging();

      messaging.onBackgroundMessage(function(payload) {
        console.log('[firebase-messaging-sw.js] Received background message ', payload);
        const notificationTitle = payload.notification?.title || 'ReliefMap Alert';
        const notificationOptions = {
          body: payload.notification?.body || payload.data?.message || '',
          icon: '/map-arrow-square-svgrepo-com.svg',
          badge: '/map-arrow-square-svgrepo-com.svg',
          tag: 'reliefmap-alert',
          requireInteraction: true,
          actions: [
            {
              action: 'view',
              title: 'View Details'
            }
          ]
        };

        return self.registration.showNotification(notificationTitle, notificationOptions);
      });
    } catch (error) {
      console.error('Failed to initialize Firebase in SW:', error);
    }
  }
});

// Fallback message handler for basic notifications
self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.notification?.body || data.data?.message || 'Emergency alert received',
      icon: '/map-arrow-square-svgrepo-com.svg',
      badge: '/map-arrow-square-svgrepo-com.svg',
      tag: 'reliefmap-emergency',
      requireInteraction: true,
      data: data.data || {},
      actions: [
        {
          action: 'view',
          title: 'View Alert'
        },
        {
          action: 'dismiss',
          title: 'Dismiss'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(
        data.notification?.title || 'ReliefMap Emergency Alert',
        options
      )
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  if (event.action === 'view') {
    // Open the app when user clicks "View Details"
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
