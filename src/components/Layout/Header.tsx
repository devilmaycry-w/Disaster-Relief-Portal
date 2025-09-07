import React from 'react';
import { AlertTriangle, Bell, Menu, MapPin, User, Map } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { state, dispatch } = useAppContext();
  const unreadCount = state.alerts.filter(alert => state.unreadAlerts.has(alert.id)).length;

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm relative z-50">
      {/* Left side - Logo and Menu */}
      <div className="flex items-center space-x-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <MapPin size={20} className="text-blue-600" />
          </div>
          <button
            onClick={() => {
              dispatch({ type: 'SET_ROUTE', payload: 'home' });
              if (state.userLocation) {
                dispatch({ type: 'SET_MAP_CENTER', payload: state.userLocation });
              }
            }}
            className="focus:outline-none group"
            aria-label="Go to map"
          >
            <span className="text-xl font-extrabold text-blue-700 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow hidden sm:block group-hover:scale-105 group-active:scale-95 transition-transform">
              ReliefMap
            </span>
            <span className="text-lg font-extrabold text-blue-700 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow sm:hidden group-hover:scale-105 group-active:scale-95 transition-transform">
              Relief
            </span>
          </button>
        </div>
      </div>

      {/* Right side - Alerts and Actions */}
      <div className="flex items-center space-x-2">
        {/* Emergency Alert Button */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_ALERTS_MODAL' })}
          className={`relative p-2 rounded-lg transition-colors ${
            unreadCount > 0
              ? 'bg-red-100 text-red-600 hover:bg-red-200'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label={`View alerts (${unreadCount})`}
        >
          {unreadCount > 0 ? (
            <AlertTriangle size={20} className="animate-pulse" />
          ) : (
            <Bell size={20} />
          )}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>


        {/* Map Icon (desktop only) */}
        <button
          onClick={() => dispatch({ type: 'SET_ROUTE', payload: 'home' })}
          className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors ml-1"
          aria-label="Map"
        >
          <Map size={20} />
        </button>

        {/* Profile Icon (desktop only) */}
        <button
          onClick={() => dispatch({ type: 'SET_ROUTE', payload: 'profile' })}
          className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors ml-1"
          aria-label="Profile"
        >
          <User size={20} />
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center space-x-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Live</span>
        </div>
      </div>
    </header>
  );
};

export default Header;