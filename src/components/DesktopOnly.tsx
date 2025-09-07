import React from 'react';
import { Monitor, Smartphone, AlertTriangle } from 'lucide-react';

interface DesktopOnlyProps {
  children: React.ReactNode;
}

const DesktopOnly: React.FC<DesktopOnlyProps> = ({ children }) => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];

      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword)) ||
                           window.innerWidth < 768 ||
                           window.innerHeight < 600 ||
                           ('ontouchstart' in window) ||
                           (navigator.maxTouchPoints > 0);

      setIsMobile(isMobileDevice);
      setIsLoading(false);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center border border-gray-200">
            <div className="mb-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-red-100 rounded-full p-4 animate-pulse"></div>
                <div className="relative bg-red-500 rounded-full p-4">
                  <AlertTriangle size={32} className="text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Desktop Access Required
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              This disaster relief platform is optimized for desktop browsers only.
              For the best experience with maps, real-time updates, and full functionality,
              please access this application from a desktop or laptop computer.
            </p>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Monitor size={20} className="text-green-600" />
                <span className="font-medium text-gray-900">Recommended</span>
              </div>
              <p className="text-sm text-gray-600">
                Use Chrome, Firefox, Safari, or Edge on Windows, Mac, or Linux
              </p>
            </div>

            <div className="bg-red-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Smartphone size={20} className="text-red-600" />
                <span className="font-medium text-red-900">Not Supported</span>
              </div>
              <p className="text-sm text-red-600">
                Mobile browsers have limited functionality for this application
              </p>
            </div>

            <div className="text-xs text-gray-500">
              <p>© 2025 ReliefMap - Disaster Relief Platform</p>
              <p>For emergency assistance, call your local emergency services</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default DesktopOnly;
