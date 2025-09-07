import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import AlertBanner from './Alerts/AlertBanner';
import { Shield, Plus } from 'lucide-react';
import { createSampleAlerts } from '../firebase';
import { Alert } from '../types';


const AlertsPage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [creatingAlerts, setCreatingAlerts] = useState(false);
  const unreadCount = state.alerts.filter(a => state.unreadAlerts.has(a.id)).length;

  const handleAlertClick = (alert: Alert) => {
    dispatch({ type: 'MARK_ALERT_READ', payload: alert.id });
    if (alert.location && typeof alert.location.lat === 'number' && typeof alert.location.lng === 'number') {
      dispatch({ type: 'SET_MAP_CENTER', payload: { lat: alert.location.lat, lng: alert.location.lng } });
      dispatch({ type: 'SET_ROUTE', payload: 'home' });
    }
  };

  const handleCreateSampleAlerts = async () => {
    setCreatingAlerts(true);
    try {
      const result = await createSampleAlerts();
      if (result.ok) {
        console.log('Sample alerts created successfully!');
      } else {
        console.error('Failed to create sample alerts:', result.error);
      }
    } catch (error) {
      console.error('Error creating sample alerts:', error);
    } finally {
      setCreatingAlerts(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center bg-gradient-to-br from-blue-50 via-white to-blue-100/60 min-h-screen p-4 sm:p-8 animate-fadeIn">
      <div className="w-full max-w-2xl mx-auto mt-4">
        {/* Header with enhanced design */}
        <div className="card-floating p-6 mb-6 animate-scaleIn">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight text-display">Emergency Alerts</h2>
              <p className="text-gray-600 mt-1 text-body">Stay informed about critical updates</p>
            </div>
          {unreadCount > 0 && (
              <div className="flex flex-col items-end">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full px-4 py-2 shadow-lg animate-bounce-subtle">
                  {unreadCount} new
            </span>
                <span className="text-xs text-gray-500 mt-1">Tap to view</span>
              </div>
          )}
          </div>
        </div>
        
        {/* Alerts List */}
        <div className="space-y-4">
          {state.alerts.map(alert => (
            <div
              key={alert.id}
              className="card-floating cursor-pointer transition-all duration-300 hover:scale-[1.02] animate-fadeIn interactive"
              onClick={() => handleAlertClick(alert)}
              style={{ animationDelay: `${state.alerts.indexOf(alert) * 0.1}s` }}
            >
              <AlertBanner alert={alert} />
            </div>
          ))}
        </div>
        
        {/* Test Button for Sample Alerts */}
        {process.env.NODE_ENV === 'development' && (
          <div className="card-floating p-4 mt-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Development: Create sample alerts for testing</p>
              <button
                onClick={handleCreateSampleAlerts}
                disabled={creatingAlerts}
                className="btn-secondary w-full py-2 text-sm flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                {creatingAlerts ? 'Creating...' : 'Create Sample Alerts'}
              </button>
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {state.alerts.length === 0 && (
          <div className="card-floating p-12 text-center animate-scaleIn">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-500 rounded-full w-16 h-16 mx-auto animate-pulse-subtle opacity-20"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-full w-16 h-16 mx-auto flex items-center justify-center shadow-lg">
                <Shield size={32} className="text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-title">All Clear</h3>
            <p className="text-gray-600 text-body">No active alerts in your area. Stay safe!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertsPage;
