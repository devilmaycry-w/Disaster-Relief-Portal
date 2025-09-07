import React, { useState, useMemo, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import {
  Info, X, Settings, Bell, Shield, MapPin, User as UserIcon,
  Navigation, Edit3
} from 'lucide-react';const faqs = [
  {
    q: 'What is ReliefMap?',
    a: 'ReliefMap is a real-time disaster relief platform that helps people find and offer help during emergencies. It shows live reports, safe zones, and resources on a map.'
  },
  {
    q: 'How do I submit a report?',
    a: 'Tap the + button on the map to submit a report about help needed, resources, or safe zones. Your location is used for accuracy.'
  },
  {
    q: 'Is my location private?',
    a: 'Your location is only used to show relevant information and is never shared publicly without your consent.'
  },
  {
    q: 'Can I use ReliefMap as a guest?',
    a: 'Yes! You can use all core features as a guest. Sign in with Google for more features and to help others.'
  },
  {
    q: 'How do I get directions?',
    a: 'Use the Directions tab below the map to get Google Maps directions from your current location to any destination.'
  },
];



const ProfilePage: React.FC = React.memo(() => {
  const { state, dispatch } = useAppContext();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationSharing, setLocationSharing] = useState(true);

  const user = state.user;
  const isGuest = useMemo(() => !user || user.id === 'guest', [user]);

  // Memoize tabs to prevent recreation on every render
  const tabs = useMemo(() => [
    { key: 'profile', label: 'Profile', icon: <UserIcon size={18} className="mr-2" /> },
    ...(!isGuest ? [{ key: 'settings', label: 'Settings', icon: <Settings size={18} className="mr-2" /> }] : []),
  ], [isGuest]);

  // Memoize background style to prevent recreation
  const backgroundStyle = useMemo(() => ({
    background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
  }), []);

  // Memoize avatar URL to prevent recreation
  const avatarUrl = useMemo(() => {
    if (isGuest) return null;
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=0D8ABC&color=fff`;
  }, [isGuest, user?.name]);

  // Memoize event handlers
  const handleTabChange = useCallback((tabKey: string) => {
    setActiveTab(tabKey);
  }, []);

  const handleNotificationsToggle = useCallback(() => {
    setNotificationsEnabled(prev => !prev);
  }, []);

  const handleLocationSharingToggle = useCallback(() => {
    setLocationSharing(prev => !prev);
  }, []);

  const handleClearAlerts = useCallback(() => {
    dispatch({ type: 'SET_ALERTS', payload: [] });
  }, [dispatch]);

  const handleEditProfile = useCallback(() => {
    alert('Edit profile coming soon!');
  }, []);

  const handleLocationClick = useCallback(() => {
    if (state.userLocation) {
      window.open(`https://www.google.com/maps/search/?api=1&query=${state.userLocation.lat},${state.userLocation.lng}`, '_blank');
    }
  }, [state.userLocation]);

  const handleAboutToggle = useCallback(() => {
    setAboutOpen(prev => !prev);
  }, []);

  return (
    <div className="flex-1 p-4 sm:p-6 min-h-screen flex flex-col items-center animate-fadeIn relative">
      {/* Radial Gradient Background from Bottom (same as SplashScreen) */}
      <div
        className="absolute inset-0 z-0"
        style={backgroundStyle}
      />
      <div className="w-full max-w-2xl mx-auto mt-4 relative z-10">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className={`py-3 px-6 font-medium text-sm flex items-center ${activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => handleTabChange(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="card-floating p-6 mb-6 text-center animate-scaleIn">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-24 h-24 mx-auto animate-pulse-subtle opacity-20"></div>
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg border-4 border-white mx-auto">
                {isGuest ? (
                  <UserIcon size={40} className="text-white" />
                ) : (
                  <img
                    src={avatarUrl || `https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff`}
                    alt="avatar"
                    className="w-24 h-24 rounded-full"
                    loading="lazy"
                  />
                )}
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-0 right-1/2 transform translate-x-12 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-3 border-white shadow-md">
                <div className="w-full h-full bg-green-500 rounded-full animate-pulse-subtle"></div>
              </div>
              {/* Edit profile button for authenticated users */}
              {!isGuest && (
                <button
                  className="absolute bottom-0 left-1/2 transform -translate-x-12 w-6 h-6 bg-gray-100 rounded-full border-2 border-white shadow-md flex items-center justify-center hover:bg-gray-200 transition-colors"
                  onClick={handleEditProfile}
                  aria-label="Edit profile"
                >
                  <Edit3 size={12} className="text-gray-600" />
                </button>
              )}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isGuest ? 'Guest User' : user?.name || 'User'}
            </h1>
            <p className="text-gray-600 mb-3">
              {isGuest ? 'Limited access mode' : user?.email || 'No email provided'}
            </p>
            {state.userLocation && (
              <div className="flex items-center justify-center text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full mb-4">
                <MapPin size={14} className="mr-1.5" />
                {state.userLocation.lat.toFixed(5)}, {state.userLocation.lng.toFixed(5)}
                <button 
                  className="ml-2 text-blue-500 hover:text-blue-700"
                  onClick={handleLocationClick}
                  aria-label="Open in Google Maps"
                >
                  <Navigation size={14} />
                </button>
              </div>
            )}
            {/* Action buttons */}
            <div className="flex justify-center gap-3 mt-4">
              {/* Sign Out button removed for Google users */}
            </div>
          </div>
        )}

        {activeTab === 'settings' && !isGuest && (
          <div className="card-floating p-6 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Settings size={20} className="mr-2" />
              Preferences
            </h2>
            {/* Notifications Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
              <div>
                <div className="flex items-center text-gray-900 font-medium mb-1">
                  <Bell size={16} className="mr-2" />
                  Push Notifications
                </div>
                <div className="text-sm text-gray-600">Emergency alerts and updates</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={notificationsEnabled}
                  onChange={handleNotificationsToggle}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {/* Location Sharing Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
              <div>
                <div className="flex items-center text-gray-900 font-medium mb-1">
                  <MapPin size={16} className="mr-2" />
                  Location Sharing
                </div>
                <div className="text-sm text-gray-600">Help others find assistance near you</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={locationSharing}
                  onChange={handleLocationSharingToggle}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            {/* About Button Only */}
            <div className="space-y-3 mt-4">
              <button 
                onClick={handleAboutToggle}
                className="w-full py-3 text-left flex items-center gap-3 justify-start rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
              >
                <Info size={18} />
                <span>About ReliefMap</span>
              </button>
            </div>
          </div>
        )}



        {/* Status & Alerts Card (always visible) */}
        <div className="card-floating p-6 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Bell size={20} className="mr-2" />
            Alerts & Status
          </h2>
          {/* Alert summary */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl mb-4 border border-blue-100">
            <div className="flex items-center">
              <div className={`rounded-full p-2 mr-3 ${state.alerts && state.alerts.length > 0 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                <Bell size={16} />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {state.alerts && state.alerts.length > 0 ? `${state.alerts.length} Active Alert(s)` : 'No Active Alerts'}
                </div>
                <div className="text-sm text-gray-600">
                  {state.alerts && state.alerts.length > 0 ? 'Review alerts for important information' : 'You\'re all caught up'}
                </div>
              </div>
            </div>
            {state.alerts && state.alerts.length > 0 && (
              <button
                onClick={handleClearAlerts}
                className="p-2 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-colors border border-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Clear all alerts"
              >
                <X size={16} className="text-gray-500" />
              </button>
            )}
          </div>
          {/* Verification status */}
          {!isGuest && (
            <div className="flex items-center p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="rounded-full p-2 mr-3 bg-green-100 text-green-600">
                <Shield size={16} />
              </div>
              <div>
                <div className="font-medium text-gray-900">Verified Account</div>
                <div className="text-sm text-gray-600">Thank you for helping the community stay safe!</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* About Dialog */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4 animate-fadeIn">
          <div className="card-floating w-full max-w-md p-6 relative animate-scaleIn shadow-xl border border-blue-200 max-h-[90vh] overflow-hidden flex flex-col">
            <button
              onClick={handleAboutToggle}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              aria-label="Close about dialog"
            >
              <X size={20} className="text-gray-600" />
            </button>
            <h2 className="text-xl font-semibold mb-4 text-gray-900 flex items-center gap-2">
              <Info size={22} className="text-blue-500" /> About ReliefMap
            </h2>
            <div className="space-y-4 overflow-y-auto flex-grow pr-2">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="font-medium text-blue-900 mb-2">Q: {faq.q}</div>
                  <div className="text-blue-800">A: {faq.a}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
                ReliefMap v1.2.0 • Making communities safer since 2023
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default ProfilePage;