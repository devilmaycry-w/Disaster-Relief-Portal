import React, { useMemo, useCallback } from 'react';
import { X, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { Alert } from '../../types';

const AlertsModal: React.FC = React.memo(() => {
  const { state, dispatch } = useAppContext();

  // Memoize filtered alerts
  const activeAlerts = useMemo(() => {
    return state.alerts.filter(alert => alert.active);
  }, [state.alerts]);

  // Memoize utility functions
  const getAlertIcon = useCallback((type: string) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Info size={20} className="text-gray-500" />;
    }
  }, []);

  const getAlertColor = useCallback((type: string) => {
    const colors = {
      danger: 'border-l-red-500 bg-red-50',
      warning: 'border-l-yellow-500 bg-yellow-50',
      info: 'border-l-blue-500 bg-blue-50',
      success: 'border-l-green-500 bg-green-50',
    };
    return colors[type as keyof typeof colors] || colors.info;
  }, []);

  const formatTimeAgo = useCallback((date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  }, []);

  // Memoize event handlers
  const handleClose = useCallback(() => {
    dispatch({ type: 'TOGGLE_ALERTS_MODAL', payload: false });
  }, [dispatch]);

  const handleViewOnMap = useCallback((alert: Alert) => {
    console.log('Alert data:', alert);
    console.log('User location:', state.userLocation);

    // Determine the destination coordinates
    let destinationLat: number | null = null;
    let destinationLng: number | null = null;

    if (alert.area && alert.area.center && typeof alert.area.center.lat === 'number' && typeof alert.area.center.lng === 'number') {
      // Use area center if available and valid
      destinationLat = alert.area.center.lat;
      destinationLng = alert.area.center.lng;
      console.log('Using area center:', destinationLat, destinationLng);
    } else if (alert.location && typeof alert.location.lat === 'number' && typeof alert.location.lng === 'number') {
      // Use direct location if available and valid
      destinationLat = alert.location.lat;
      destinationLng = alert.location.lng;
      console.log('Using direct location:', destinationLat, destinationLng);
    }

    if (destinationLat !== null && destinationLng !== null && !isNaN(destinationLat) && !isNaN(destinationLng)) {
      const userLocation = state.userLocation;
      let googleMapsUrl;

      if (userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number' && !isNaN(userLocation.lat) && !isNaN(userLocation.lng)) {
        // Directions from current location to destination
        googleMapsUrl = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${destinationLat},${destinationLng}`;
        console.log('Using directions URL:', googleMapsUrl);
      } else {
        // Just show the destination location with zoom
        googleMapsUrl = `https://www.google.com/maps?q=${destinationLat},${destinationLng}&ll=${destinationLat},${destinationLng}&z=15`;
        console.log('Using location URL (no user location):', googleMapsUrl);
        window.alert('Using destination location only. For turn-by-turn directions, please refresh the page to detect your location.');
      }

      window.open(googleMapsUrl, '_blank');
    } else {
      console.error('No valid destination coordinates found for alert:', alert);
      window.alert('Unable to find valid location coordinates for this alert. Please try again or contact support.');
    }
  }, [state.userLocation]);

  const handleShare = useCallback((alert: Alert) => {
    // Get user's IP address (simulated for demo)
    const userIP = '192.168.1.100'; // In real app, this would come from backend
    const locationInfo = alert.area
      ? `📍 Location: ${alert.area.center.lat.toFixed(4)}, ${alert.area.center.lng.toFixed(4)} (Radius: ${(alert.area.radius / 1000).toFixed(1)}km)`
      : alert.location
      ? `📍 Location: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
      : '📍 Location: Not specified';

    const shareText = `🚨 URGENT EMERGENCY ALERT 🚨

📢 Alert: ${alert.title}
📝 Description: ${alert.message}
${locationInfo}
👤 Reported by: Anonymous user (IP: ${userIP})
⏰ Time: ${alert.createdAt.toLocaleString()}
📊 Status: ${alert.active ? 'ACTIVE' : 'INACTIVE'}

⚠️ This is a critical emergency situation requiring immediate attention!

Please help by:
• Contacting local authorities if you're in the area
• Sharing this information with others who might be affected
• Providing assistance if you have relevant resources
• Staying safe and following official guidelines

#EmergencyAlert #DisasterRelief #ReliefMap`;

    // Create WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  if (!state.showAlertsModal) return null;  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle size={20} className="text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Emergency Alerts</h2>
              <p className="text-sm text-gray-600">
                {activeAlerts.length} active alert{activeAlerts.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[calc(90vh-80px)] overflow-y-auto">
          {activeAlerts.length === 0 ? (
            <div className="p-8 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Alerts</h3>
              <p className="text-gray-600">There are currently no emergency alerts in your area.</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border-l-4 p-4 rounded-lg ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                        <p className="text-gray-700 text-sm leading-relaxed mb-2">
                          {alert.message}
                        </p>
                        
                        {alert.area && (
                          <div className="text-xs text-gray-600 mb-2">
                            📍 Radius: {(alert.area.radius / 1000).toFixed(1)}km from {alert.area.center.lat.toFixed(3)}, {alert.area.center.lng.toFixed(3)}
                          </div>
                        )}

                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock size={12} />
                            <span>{formatTimeAgo(alert.createdAt)}</span>
                          </div>
                          {alert.expiresAt && (
                            <div className="flex items-center space-x-1">
                              <span>Expires: {alert.expiresAt.toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alert Actions */}
                  <div className="mt-3 pt-3 border-t border-gray-200 flex space-x-2">
                    <button
                      onClick={() => handleViewOnMap(alert)}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      View on Map
                    </button>
                    <button
                      onClick={() => handleShare(alert)}
                      className="text-green-600 text-sm font-medium hover:underline"
                    >
                      Share on WhatsApp
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Emergency Contacts */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <h4 className="font-semibold text-gray-900 mb-3">Emergency Contacts</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <a href="tel:911" className="flex items-center space-x-2 p-3 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                <span className="font-bold text-red-700">🚨</span>
                <div>
                  <div className="font-medium text-red-800">Emergency</div>
                  <div className="text-red-600">911</div>
                </div>
              </a>
              <a href="tel:311" className="flex items-center space-x-2 p-3 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <span className="font-bold text-blue-700">ℹ️</span>
                <div>
                  <div className="font-medium text-blue-800">Non-Emergency</div>
                  <div className="text-blue-600">311</div>
                </div>
              </a>
              <a href="tel:211" className="flex items-center space-x-2 p-3 bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
                <span className="font-bold text-green-700">🏠</span>
                <div>
                  <div className="font-medium text-green-800">Community Help</div>
                  <div className="text-green-600">211</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AlertsModal;