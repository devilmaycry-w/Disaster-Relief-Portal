import React from 'react';
import { AlertTriangle, Bell, Menu, MapPin, User, Map, Wifi } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { state, dispatch } = useAppContext();
  const unreadCount = state.alerts.filter(alert => state.unreadAlerts.has(alert.id)).length;

  return (
    <header className="glass-strong border-b border-white/20 px-4 py-3 flex items-center justify-between shadow-lg relative z-50 animate-fadeIn">
      {/* Left side - Logo and Menu */}
      <div className="flex items-center space-x-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 md:hidden interactive"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
        )}
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
            <MapPin size={20} className="text-white" />
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
            <span className="text-xl font-extrabold text-blue-700 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent text-shadow hidden sm:block group-hover:scale-105 group-active:scale-95 transition-all duration-200">
              ReliefMap
            </span>
            <span className="text-lg font-extrabold text-blue-700 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent text-shadow sm:hidden group-hover:scale-105 group-active:scale-95 transition-all duration-200">
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
              ? 'bg-red-100 text-red-600 hover:bg-red-200 pulse-red'
              : 'bg-white/20 text-gray-600 hover:bg-white/30'
          }`}
          className={`relative p-3 rounded-xl transition-all duration-200 interactive ${
            unreadCount > 0
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg pulse-red'
              : 'bg-white/20 text-gray-600 hover:bg-white/30'
          }`}
          aria-label={`View alerts (${unreadCount})`}
        >
          {unreadCount > 0 ? (
            <AlertTriangle size={20} className="animate-pulse-subtle" />
          ) : (
            <Bell size={20} />
          )}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-bounce-subtle">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>


        {/* Map Icon (desktop only) */}
        <button
          onClick={() => dispatch({ type: 'SET_ROUTE', payload: 'home' })}
          className="hidden md:flex items-center justify-center p-3 rounded-xl hover:bg-white/20 transition-all duration-200 ml-1 interactive"
          aria-label="Map"
        >
          <Map size={20} />
        </button>

        {/* Profile Icon (desktop only) */}
        <button
          onClick={() => dispatch({ type: 'SET_ROUTE', payload: 'profile' })}
          className="hidden md:flex items-center justify-center p-3 rounded-xl hover:bg-white/20 transition-all duration-200 ml-1 interactive"
          aria-label="Profile"
        >
          <User size={20} />
        </button>

        {/* Status Indicator */}
        <div className="hidden sm:flex items-center space-x-2 text-sm bg-white/20 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 status-online rounded-full animate-pulse-subtle"></div>
          <Wifi size={14} className="text-gray-600" />
          <span className="text-gray-600 font-medium">Live</span>
        </div>
      </div>
    </header>
  );
};

export default Header;