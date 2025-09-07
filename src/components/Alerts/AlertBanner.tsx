
import { AlertTriangle, X } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { Alert } from '../../types';

const AlertBanner: React.FC<{ alert: Alert }> = ({ alert }) => {
  const color = alert.type === 'danger' ? 'bg-red-50 border-red-200 text-red-800' : alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-blue-50 border-blue-200 text-blue-800';
  const { dispatch } = useAppContext();

  const handleViewOnMap = () => {
    if (alert.location && alert.location.lat && alert.location.lng) {
      dispatch({ type: 'SET_MAP_CENTER', payload: { lat: alert.location.lat, lng: alert.location.lng } });
      dispatch({ type: 'SET_ROUTE', payload: 'home' });
    }
  };

  const handleShare = () => {
    const text = `🚨 ${alert.title}\n${alert.message}\nLocation: ${alert.location ? `${alert.location.lat},${alert.location.lng}` : ''}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const { state } = useAppContext();
  const handleDismiss = () => {
    // For guest: remove alert locally (dispatch SET_ALERTS with filtered list)
    const filtered = state.alerts.filter((a) => a.id !== alert.id);
    dispatch({ type: 'SET_ALERTS', payload: filtered });
  };

  // Determine if this alert is new/unread
  const isNew = state.unreadAlerts && state.unreadAlerts.has(alert.id);

  return (
    <div className={`border p-4 rounded-lg ${color} relative` + (isNew ? ' ring-2 ring-blue-400/60' : '')}>
      <div className="flex items-start">
        <div className="mr-3">
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              {alert.title}
              {isNew && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-bold animate-bounce-subtle">NEW</span>
              )}
            </h3>
            <span className="text-xs text-gray-500">{new Date(alert.createdAt).toLocaleString()}</span>
          </div>
          <p className="text-sm mt-1 text-gray-700">{alert.message}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={handleViewOnMap} className="text-blue-600 text-xs font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2" aria-label="View alert on map" tabIndex={0}>View on Map</button>
            <button onClick={handleShare} className="text-green-600 text-xs font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2" aria-label="Share alert" tabIndex={0}>Share Alert</button>
          </div>
        </div>
        <button className="ml-3 p-1 hover:bg-white rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2" aria-label="Dismiss alert" onClick={handleDismiss} tabIndex={0}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
