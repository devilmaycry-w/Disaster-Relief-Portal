import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import AlertBanner from './Alerts/AlertBanner';


const AlertsPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const unreadCount = state.alerts.filter(a => state.unreadAlerts.has(a.id)).length;

  const handleAlertClick = (alert: any) => {
    dispatch({ type: 'MARK_ALERT_READ', payload: alert.id });
    if (alert.location && typeof alert.location.lat === 'number' && typeof alert.location.lng === 'number') {
      dispatch({ type: 'SET_MAP_CENTER', payload: { lat: alert.location.lat, lng: alert.location.lng } });
      dispatch({ type: 'SET_ROUTE', payload: 'home' });
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-gradient-to-br from-blue-200/80 via-white/90 to-blue-100/60 min-h-screen p-0 sm:p-8">
      <div className="w-full max-w-2xl mx-auto mt-8">
        <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 rounded-t-2xl mb-2" />
        <div className="flex items-center justify-between mb-7 px-2">
          <h2 className="text-3xl font-extrabold text-blue-800 tracking-tight drop-shadow">Alerts</h2>
          {unreadCount > 0 && (
            <span className="bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full px-4 py-1 shadow-lg ring-2 ring-red-200 animate-pulse">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="space-y-6">
          {state.alerts.map(alert => (
            <div
              key={alert.id}
              className="backdrop-blur bg-white/80 border border-blue-100 rounded-3xl shadow-2xl p-0 transition hover:scale-[1.015] hover:shadow-blue-200/80 cursor-pointer ring-1 ring-blue-200/30"
              onClick={() => handleAlertClick(alert)}
            >
              <AlertBanner alert={alert} />
            </div>
          ))}
        </div>
        {state.alerts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="text-6xl mb-4 animate-bounce">🛡️</span>
            <div className="text-xl font-bold text-blue-700 mb-1">No Alerts</div>
            <div className="text-blue-400 text-base">You're all caught up. Stay safe!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
