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
    })
    .catch((err: Error) => {
      console.warn('Service worker registration failed:', err);
    });
}
