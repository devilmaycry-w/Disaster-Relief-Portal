import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for Firebase Messaging
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then(reg => {
      // expose for later use (AppContext will attempt to read this)
      (window as any).__swRegistration = reg;
      console.log('SW registered for FCM', reg);
    })
    .catch(err => {
      console.warn('Service worker registration failed:', err);
    });
}
