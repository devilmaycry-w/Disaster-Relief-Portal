
import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Info, X, Settings, Bell, Shield, MapPin, User as UserIcon } from 'lucide-react';

const faqs = [
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

const ProfilePage: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [aboutOpen, setAboutOpen] = useState(false);

  const user = state.user;
  const isGuest = !user || user.id === 'guest';

  return (
    <div className="flex-1 p-4 sm:p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100/60 min-h-screen flex flex-col items-center animate-fadeIn">
      <div className="w-full max-w-lg mx-auto mt-4">
        {/* Profile Header Card */}
        <div className="card-floating p-8 mb-6 text-center animate-scaleIn">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-24 h-24 mx-auto animate-pulse-subtle opacity-20"></div>
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-white mx-auto">
            {isGuest ? (
                <UserIcon size={40} className="text-white" />
            ) : (
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0D8ABC&color=fff`} 
                  alt="avatar" 
                  className="w-24 h-24 rounded-full" 
                />
            )}
            </div>
            {/* Status indicator */}
            <div className="absolute bottom-0 right-1/2 transform translate-x-12 w-6 h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-3 border-white shadow-lg">
              <div className="w-full h-full bg-green-500 rounded-full animate-pulse-subtle"></div>
            </div>
          </div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-display">
            {isGuest ? 'Guest User' : user.name}
          </h1>
          <p className="text-gray-600 mb-2 text-body">
            {isGuest ? 'Limited access mode' : user.email || 'No email provided'}
          </p>
          {state.userLocation && (
            <div className="flex items-center justify-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              <MapPin size={14} className="mr-1" />
              {state.userLocation.lat.toFixed(3)}, {state.userLocation.lng.toFixed(3)}
            </div>
          )}
        </div>

        {/* Settings Card */}
        <div className="card-floating p-6 mb-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-xl font-bold text-gray-900 mb-4 text-title flex items-center">
            <Settings size={20} className="mr-2" />
            Settings
          </h2>
          
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
            <div>
              <div className="flex items-center text-gray-900 font-semibold mb-1">
                <Bell size={16} className="mr-2" />
                Push Notifications
              </div>
              <div className="text-sm text-gray-600">Emergency alerts and updates</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => setAboutOpen(true)} 
              className="w-full btn-primary py-3 text-left flex items-center gap-3 justify-start"
            >
              <Info size={18} />
              <span>About ReliefMap</span>
            </button>
            
            <button 
              onClick={() => dispatch({ type: 'SET_ALERTS', payload: [] })} 
              className="w-full btn-secondary py-3 text-left flex items-center gap-3 justify-start"
            >
              <Shield size={18} />
              <span>Clear All Alerts</span>
            </button>
          </div>
        </div>

        {/* Status Card */}
        {!isGuest && (
          <div className="card-floating p-4 text-center animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                <Shield size={14} className="mr-1" />
                Verified
              </span>
              <span className="text-gray-700 font-medium">Authenticated User</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Thank you for helping the community stay safe!</p>
          </div>
        )}
      </div>

      {/* About Dialog */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md p-4 animate-fadeIn">
          <div className="card-floating max-w-lg w-full p-8 relative animate-scaleIn">
            <button 
              onClick={() => setAboutOpen(false)} 
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-all duration-200 interactive"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-extrabold mb-6 text-gray-900 text-title">About ReliefMap</h2>
            <div className="space-y-6 scrollbar-custom max-h-96 overflow-y-auto">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl">
                  <div className="font-semibold text-gray-900 mb-2 text-caption">Q: {faq.q}</div>
                  <div className="text-gray-700 text-body">A: {faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
