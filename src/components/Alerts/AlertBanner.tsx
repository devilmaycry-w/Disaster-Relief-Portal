
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

  return (
    <div className={`border p-4 rounded-lg ${color}`}>
      <div className="flex items-start">
        <div className="mr-3">
          <AlertTriangle size={20} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{alert.title}</h3>
            <span className="text-xs text-gray-500">{new Date(alert.createdAt).toLocaleString()}</span>
          </div>
          <p className="text-sm mt-1 text-gray-700">{alert.message}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={handleViewOnMap} className="text-blue-600 text-xs font-medium hover:underline">View on Map</button>
            <button onClick={handleShare} className="text-green-600 text-xs font-medium hover:underline">Share Alert</button>
          </div>
        </div>
        <button className="ml-3 p-1 hover:bg-white rounded" aria-label="dismiss" onClick={handleDismiss}>
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default AlertBanner;
