import React, { useState } from 'react';
import { AlertTriangle, Bell, Menu, MapPin, User, Map, Wifi, Search } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import MobileSearchModal from './MobileSearchModal';

interface HeaderProps {
  onMenuToggle?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {

  const { state, dispatch } = useAppContext();
  const unreadCount = state.alerts.filter(alert => state.unreadAlerts.has(alert.id)).length;
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  // Search handler for mobile modal
  const handleMobileSearch = async (query: string) => {
    setSearchLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        dispatch({ type: 'SET_MAP_CENTER', payload: loc });
        dispatch({ type: 'SET_ROUTE', payload: 'home' });
      } else {
        alert('Place not found.');
      }
    } catch {
      alert('Search failed.');
    } finally {
      setSearchLoading(false);
      setSearchOpen(false);
    }
  };

  return (
    <header className="glass-strong border-b border-white/20 px-4 py-3 flex items-center justify-between shadow-lg sticky top-0 z-50 animate-fadeIn">
      {/* Left side - Logo and Menu */}
      <div className="flex items-center space-x-3">
        {onMenuToggle && (
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-white/20 transition-all duration-200 md:hidden interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            aria-label="Toggle menu"
            tabIndex={0}
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
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 group"
            aria-label="Go to map"
            tabIndex={0}
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

        {/* Mobile search icon */}
        <button
          className="flex md:hidden items-center justify-center p-3 rounded-xl hover:bg-white/20 transition-all duration-200 ml-1 interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          aria-label="Search"
          onClick={() => setSearchOpen(true)}
          tabIndex={0}
        >
          <Search size={20} />
        </button>
      {/* Mobile Search Modal */}
      <MobileSearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSearch={handleMobileSearch}
        loading={searchLoading}
      />
        {/* Emergency Alert Button */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_ALERTS_MODAL' })}
          className={`relative p-3 rounded-xl transition-all duration-200 interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 ${
            unreadCount > 0
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg pulse-red'
              : 'bg-white/20 text-gray-600 hover:bg-white/30'
          }`}
          aria-label={`View alerts (${unreadCount})`}
          tabIndex={0}
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
          className="hidden md:flex items-center justify-center p-3 rounded-xl hover:bg-white/20 transition-all duration-200 ml-1 interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          aria-label="Map"
          tabIndex={0}
        >
          <Map size={20} />
        </button>

        {/* Profile Icon (desktop only) */}
        <button
          onClick={() => dispatch({ type: 'SET_ROUTE', payload: 'profile' })}
          className="hidden md:flex items-center justify-center p-3 rounded-xl hover:bg-white/20 transition-all duration-200 ml-1 interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2"
          aria-label="Profile"
          tabIndex={0}
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