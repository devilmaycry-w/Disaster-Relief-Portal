import React from 'react';
import { MapPin, Bell, User } from 'lucide-react';

const BottomNav: React.FC<{ active: 'home' | 'alerts' | 'profile'; onChange: (r: 'home' | 'alerts' | 'profile') => void }> = ({ active, onChange }) => {
  return (
    <nav className="bg-white border-t border-gray-200 p-2 fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="max-w-3xl mx-auto flex justify-between">
        <button onClick={() => onChange('home')} className={`flex-1 py-2 flex flex-col items-center text-sm ${active === 'home' ? 'text-blue-600' : 'text-gray-600'}`}>
          <MapPin size={20} />
          <span>Map</span>
        </button>
        <button onClick={() => onChange('alerts')} className={`flex-1 py-2 flex flex-col items-center text-sm ${active === 'alerts' ? 'text-red-600' : 'text-gray-600'}`}>
          <Bell size={20} />
          <span>Alerts</span>
        </button>
        <button onClick={() => onChange('profile')} className={`flex-1 py-2 flex flex-col items-center text-sm ${active === 'profile' ? 'text-green-600' : 'text-gray-600'}`}>
          <User size={20} />
          <span>Profile</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
