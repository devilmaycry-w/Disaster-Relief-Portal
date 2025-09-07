import React from 'react';
import { MapPin, Bell, User, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const BottomNav: React.FC<{ 
  active: 'home' | 'alerts' | 'profile'; 
  onChange: (r: 'home' | 'alerts' | 'profile') => void 
}> = ({ active, onChange }) => {
  const { state } = useAppContext();
  const unreadCount = state.alerts.filter(alert => state.unreadAlerts.has(alert.id)).length;

  return (
    <nav className="glass-strong border-t border-white/20 p-3 fixed bottom-0 left-0 right-0 z-50 md:hidden shadow-2xl animate-slideUp">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => onChange('home')} 
          className={`
            flex-1 py-3 flex flex-col items-center text-xs font-semibold rounded-xl transition-all duration-300 interactive
            ${active === 'home' 
              ? 'text-blue-600 bg-blue-50/50 backdrop-blur-md transform scale-105' 
              : 'text-gray-600 hover:text-blue-500 hover:bg-white/20'
            }
          `}
        >
          <div className={`p-1 rounded-lg ${active === 'home' ? 'bg-blue-100' : ''}`}>
            <MapPin size={22} />
          </div>
          <span className="mt-1">Map</span>
        </button>
        
        <button 
          onClick={() => onChange('alerts')} 
          className={`
            flex-1 py-3 flex flex-col items-center text-xs font-semibold rounded-xl transition-all duration-300 interactive relative
            ${active === 'alerts' 
              ? 'text-red-600 bg-red-50/50 backdrop-blur-md transform scale-105' 
              : 'text-gray-600 hover:text-red-500 hover:bg-white/20'
            }
          `}
        >
          <div className={`p-1 rounded-lg relative ${active === 'alerts' ? 'bg-red-100' : ''}`}>
            {unreadCount > 0 ? (
              <AlertTriangle size={22} className="animate-pulse-subtle" />
            ) : (
              <Bell size={22} />
            )}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-bounce-subtle">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </div>
          <span className="mt-1">Alerts</span>
        </button>
        
        <button 
          onClick={() => onChange('profile')} 
          className={`
            flex-1 py-3 flex flex-col items-center text-xs font-semibold rounded-xl transition-all duration-300 interactive
            ${active === 'profile' 
              ? 'text-green-600 bg-green-50/50 backdrop-blur-md transform scale-105' 
              : 'text-gray-600 hover:text-green-500 hover:bg-white/20'
            }
          `}
        >
          <div className={`p-1 rounded-lg ${active === 'profile' ? 'bg-green-100' : ''}`}>
            <User size={22} />
          </div>
          <span className="mt-1">Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
