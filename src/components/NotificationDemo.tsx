import React, { useState } from 'react';
import { Bell, BellRing, AlertTriangle, CloudRain, Package, Shield, Play, CheckCircle } from 'lucide-react';
import { notificationManager, demoNotifications } from '../utils/notifications';

interface NotificationDemoProps {
  onClose?: () => void;
}

const NotificationDemo: React.FC<NotificationDemoProps> = ({ onClose }) => {
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');
  const [isDemoRunning, setIsDemoRunning] = useState(false);

  React.useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  const handleRequestPermission = async () => {
    const status = await notificationManager.requestPermission();
    setPermissionStatus(status);
  };

  const handleTestNotification = async () => {
    try {
      await notificationManager.showEmergencyAlert(
        '🔔 Test Notification',
        'This is a test notification to verify the system is working!',
        'Test Location'
      );
      alert('Test notification sent! Check your browser notifications.');
    } catch (error) {
      console.error('Test notification failed:', error);
      alert('Failed to send notification. Please check permissions.');
    }
  };

  const handleRunDemo = async () => {
    setIsDemoRunning(true);
    try {
      await demoNotifications();
      setTimeout(() => setIsDemoRunning(false), 8000);
    } catch (error) {
      console.error('Demo failed:', error);
      setIsDemoRunning(false);
    }
  };

  const notificationTypes = [
    {
      icon: <AlertTriangle className="text-red-500" size={20} />,
      title: 'Emergency Alerts',
      description: 'Critical flood warnings and evacuation notices',
      example: 'Heavy rainfall expected - evacuate to higher ground'
    },
    {
      icon: <CloudRain className="text-blue-500" size={20} />,
      title: 'Weather Updates',
      description: 'Real-time weather conditions and forecasts',
      example: 'Flooding possible in low-lying areas'
    },
    {
      icon: <Package className="text-green-500" size={20} />,
      title: 'Resource Updates',
      description: 'New shelters, supplies, and relief centers',
      example: 'New shelter opened at Community Center'
    },
    {
      icon: <Shield className="text-purple-500" size={20} />,
      title: 'Safety Tips',
      description: 'Important safety information and guidelines',
      example: 'Keep emergency supplies ready'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-lg">
            <BellRing className="text-blue-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Notification System</h3>
            <p className="text-sm text-gray-600">Real-time alerts for disaster response</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Permission Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Notification Permission</span>
          <span className={`px-2 py-1 text-xs rounded-full ${
            permissionStatus === 'granted' ? 'bg-green-100 text-green-800' :
            permissionStatus === 'denied' ? 'bg-red-100 text-red-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {permissionStatus === 'granted' ? 'Granted' :
             permissionStatus === 'denied' ? 'Denied' :
             'Not Set'}
          </span>
        </div>

        {permissionStatus !== 'granted' && (
          <button
            onClick={handleRequestPermission}
            className="w-full btn-primary py-2 text-sm"
          >
            <Bell size={16} className="inline mr-2" />
            Enable Notifications
          </button>
        )}
      </div>

      {/* Notification Types */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Notification Types</h4>
        <div className="space-y-3">
          {notificationTypes.map((type, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="mt-0.5">{type.icon}</div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-gray-900">{type.title}</h5>
                <p className="text-xs text-gray-600 mb-1">{type.description}</p>
                <p className="text-xs text-gray-500 italic">Example: {type.example}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Section */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Demo Notifications</span>
          {isDemoRunning && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Running demo...
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleTestNotification}
            disabled={permissionStatus !== 'granted'}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
              permissionStatus === 'granted'
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Bell size={16} className="inline mr-2" />
            Test Single Notification
          </button>

          <button
            onClick={handleRunDemo}
            disabled={permissionStatus !== 'granted' || isDemoRunning}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
              permissionStatus === 'granted' && !isDemoRunning
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isDemoRunning ? (
              <>
                <CheckCircle size={16} className="inline mr-2" />
                Demo Running...
              </>
            ) : (
              <>
                <Play size={16} className="inline mr-2" />
                Run Full Demo
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          {permissionStatus !== 'granted'
            ? 'Enable notifications first to test the system'
            : 'Test single notification or run the full 4-notification demo sequence'
          }
        </p>
      </div>

      {/* Implementation Notes */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h5 className="text-xs font-medium text-blue-900 mb-1">For Hackathon Implementation:</h5>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Uses browser Notification API</li>
          <li>• Integrates with Firebase Cloud Messaging</li>
          <li>• Supports different notification types with proper categorization</li>
          <li>• Auto-dismisses non-critical notifications after 5 seconds</li>
          <li>• Emergency notifications stay visible until user interaction</li>
          <li>• Works across all modern browsers (Chrome, Firefox, Safari, Edge)</li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationDemo;
