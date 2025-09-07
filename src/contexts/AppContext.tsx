// Re-export useAppContext for compatibility with existing imports
import { useContext } from 'react';
import React, { createContext, useReducer, useEffect } from 'react';
import {
  initFirebase,
  listenReports,
  listenAlerts,
  requestNotificationPermissionAndGetToken,
  onMessageListener,
} from '../firebase';
import {
  AppState,
  AppAction,
  initialState,
  appReducer,
  ImportMetaEnv,
} from './appContextUtils';


export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

  // useAppContext should be imported from appContextUtils if needed
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Always fetch and update userLocation on mount/reload
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: 'SET_USER_LOCATION',
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        (error) => {
          console.warn('Geolocation error:', error);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, []);

  useEffect(() => {
    let reportsUnsub: (() => void) | null = null;
    let alertsUnsub: (() => void) | null = null;

    (async () => {
      await initFirebase();

      reportsUnsub = await listenReports((reportsData: any[]) => {
        const mapped = reportsData.map((r) => ({
          id: r.id,
          type: r.type,
          title: r.title,
          description: r.description,
          location: r.location,
          createdAt: r.createdAt ? new Date(r.createdAt) : new Date(),
          updatedAt: r.updatedAt ? new Date(r.updatedAt) : new Date(),
          status: r.status || 'active',
          priority: r.priority || 'medium',
          contact: r.contact,
          resourceType: r.resourceType,
          capacity: r.capacity,
          verified: !!r.verified,
        })) as any[]; // TODO: Replace any[] with Report[]

        dispatch({ type: 'SET_REPORTS', payload: mapped });
        dispatch({ type: 'SET_LOADING', payload: false });
      });

      alertsUnsub = await listenAlerts((alertsData: any[]) => {
        const mapped = alertsData.map((a) => ({
          id: a.id,
          title: a.title,
          message: a.message || a.description || '',
          type: a.type || 'info',
          area: a.area,
          location: a.location || (a.area ? a.area.center : undefined),
          createdAt: a.createdAt ? new Date(a.createdAt) : new Date(),
          expiresAt: a.expiresAt ? new Date(a.expiresAt) : undefined,
          active: a.active !== false,
        })) as any[]; // TODO: Replace any[] with Alert[]

        dispatch({ type: 'SET_ALERTS', payload: mapped });
      });

      try {
        const env = import.meta.env as ImportMetaEnv;
        const vapidKey = env.VITE_FCM_VAPID_KEY || '';
        if (vapidKey) {
          const swReg = (window as any).__swRegistration as ServiceWorkerRegistration | undefined;
          const token = await requestNotificationPermissionAndGetToken(vapidKey, swReg || null);
          if (token) {
            console.log('FCM token:', token);
            // Optionally send to backend
          }
        }
      } catch (err) {
        console.warn('FCM token error:', err);
      }

      try {
        onMessageListener((payload) => {
          console.log('Foreground FCM message received:', payload);
        });
      } catch (err) {
        console.warn('FCM message listener error:', err);
      }
    })();

    return () => {
      if (reportsUnsub) reportsUnsub();
      if (alertsUnsub) alertsUnsub();
    };
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
