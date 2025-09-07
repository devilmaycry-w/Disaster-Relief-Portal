import React from 'react';
import { Monitor, Smartphone, AlertTriangle } from 'lucide-react';

const DeviceTest: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = React.useState({
    isMobile: false,
    userAgent: '',
    screenWidth: 0,
    screenHeight: 0,
    hasTouch: false,
    maxTouchPoints: 0
  });

  React.useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) ||
                           window.innerWidth < 768 ||
                           window.innerHeight < 600 ||
                           ('ontouchstart' in window) ||
                           (navigator.maxTouchPoints > 0);

      setDeviceInfo({
        isMobile: isMobileDevice,
        userAgent: navigator.userAgent,
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
        hasTouch: 'ontouchstart' in window,
        maxTouchPoints: navigator.maxTouchPoints || 0
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <div className={`absolute inset-0 rounded-full p-4 animate-pulse ${
                deviceInfo.isMobile ? 'bg-red-100' : 'bg-green-100'
              }`}></div>
              <div className={`relative rounded-full p-4 ${
                deviceInfo.isMobile ? 'bg-red-500' : 'bg-green-500'
              }`}>
                {deviceInfo.isMobile ? (
                  <Smartphone size={32} className="text-white" />
                ) : (
                  <Monitor size={32} className="text-white" />
                )}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Device Detection Test
            </h1>

            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
              deviceInfo.isMobile
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {deviceInfo.isMobile ? (
                <>
                  <Smartphone size={16} />
                  Mobile Device Detected
                </>
              ) : (
                <>
                  <Monitor size={16} />
                  Desktop Device Detected
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Device Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Screen Size:</span>
                  <span className="font-mono">{deviceInfo.screenWidth} × {deviceInfo.screenHeight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Touch Support:</span>
                  <span className={`font-medium ${deviceInfo.hasTouch ? 'text-green-600' : 'text-gray-500'}`}>
                    {deviceInfo.hasTouch ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Touch Points:</span>
                  <span className="font-mono">{deviceInfo.maxTouchPoints}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-3">User Agent</h3>
              <p className="text-xs font-mono text-gray-700 break-all">
                {deviceInfo.userAgent}
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Test Results</h4>
                  <p className="text-sm text-blue-800">
                    {deviceInfo.isMobile
                      ? "This device would show the desktop-only message. Try accessing from a desktop browser to see the full app."
                      : "This device passes the desktop check. The full ReliefMap application should load normally."
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.location.href = '/'}
              className="btn-primary px-6 py-3"
            >
              Back to App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceTest;
