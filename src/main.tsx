import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import DesktopOnly from './components/DesktopOnly.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DesktopOnly>
      <App />
    </DesktopOnly>
  </StrictMode>
);

// Register service worker for Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((reg: ServiceWorkerRegistration) => {
      // expose for later use (AppContext will attempt to read this)
      (window as any).__swRegistration = reg;
      console.log('SW registered for FCM', reg);

      // Send Firebase config to service worker securely
      // This happens after the main app has loaded the environment variables
      setTimeout(() => {
        const firebaseConfig = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
        };

        // Only send config if all required keys are present
        if (firebaseConfig.apiKey && firebaseConfig.projectId) {
          reg.active?.postMessage({
            type: 'FIREBASE_CONFIG',
            config: firebaseConfig
          });
        }
      }, 1000); // Small delay to ensure SW is ready
    })
    .catch((err: Error) => {
      console.warn('Service worker registration failed:', err);
    });
}
