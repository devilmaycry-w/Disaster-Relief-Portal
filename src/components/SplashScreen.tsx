
import React from 'react';
import { signInWithGoogle } from '../firebase';
import { useAppContext } from '../contexts/AppContext';
import { MapPin, Shield, Users, Heart } from 'lucide-react';

const SplashScreen: React.FC<{ onContinue?: () => void }> = ({ onContinue }) => {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);


  const handleGuest = () => {
    setIsLoading(true);
    dispatch({
      type: 'SET_USER',
      payload: {
        id: 'guest',
        name: 'Guest User',
        role: 'user',
        verified: false,
      },
    });
    setTimeout(() => {
      if (onContinue) onContinue();
    }, 500);
  };

  const handleGoogle = async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        dispatch({ type: 'SET_USER', payload: {
          id: user.uid,
          name: user.displayName || undefined,
          email: user.email || undefined,
          role: 'user',
          verified: true,
        }});
        if (onContinue) onContinue();
      }
    } catch {
      setIsLoading(false);
      alert('Google login failed');
    }
  };

    return (
    <div className="min-h-screen w-full relative">
      {/* Radial Gradient Background from Bottom */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />
      <div className="fixed inset-0 z-10 flex flex-col items-center justify-center min-h-screen min-w-full">
        <div className="max-w-md w-full mx-4 sm:mx-auto text-center relative z-10">
          {/* Hero Icon with Animation */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-24 h-24 mx-auto animate-pulse-subtle opacity-20"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-24 h-24 mx-auto flex items-center justify-center shadow-2xl animate-scaleIn">
              <MapPin size={40} className="text-white drop-shadow-lg" />
            </div>
          </div>
          {/* Title and Subtitle */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-display animate-fadeIn">
            ReliefMap
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-body animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            Real-time disaster relief mapping
          </p>
          {/* Feature Icons */}
          <div className="flex justify-center space-x-6 mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-red-100 rounded-xl mb-2">
                <Heart size={20} className="text-red-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Help</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-green-100 rounded-xl mb-2">
                <Shield size={20} className="text-green-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Safety</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="p-3 bg-purple-100 rounded-xl mb-2">
                <Users size={20} className="text-purple-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Community</span>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="space-y-4 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
            <button
              onClick={handleGuest}
              disabled={isLoading}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              aria-label="Continue as guest"
              tabIndex={0}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                'Continue as Guest'
              )}
            </button>
            <button
              onClick={handleGoogle}
              disabled={isLoading}
              className="w-full btn-secondary py-4 text-lg flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
              aria-label="Login with Google"
              tabIndex={0}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-bold text-black">Login with Google</span>
            </button>
          </div>
          {/* Footer Text */}
          <p className="text-xs text-gray-500 mt-8 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
            Fast, secure, and mobile-first disaster relief platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
