
import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { Info, X } from 'lucide-react';

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
    <div className="flex-1 p-0 sm:p-8 bg-gradient-to-br from-blue-200/80 via-white/90 to-blue-100/60 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-lg mx-auto mt-10">
        <div className="h-2 w-full bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 rounded-t-2xl mb-2" />
        <div className="flex flex-col items-center space-y-5 pt-8 pb-8">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-2xl border-4 border-white ring-4 ring-blue-200/40">
            {isGuest ? (
              <span className="text-7xl">👤</span>
            ) : (
              <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=0D8ABC&color=fff`} alt="avatar" className="w-32 h-32 rounded-full" />
            )}
          </div>
          <div className="text-3xl font-extrabold text-blue-800 tracking-tight text-center drop-shadow">{isGuest ? 'Guest User' : user.name}</div>
          <div className="text-base text-blue-500 text-center font-medium">{isGuest ? 'Limited access' : user.email || 'No email'}</div>
          <div className="text-xs text-blue-600 mt-1">{state.userLocation ? `${state.userLocation.lat.toFixed(3)}, ${state.userLocation.lng.toFixed(3)}` : 'No location'}</div>
        </div>

        <div className="bg-white/90 backdrop-blur p-8 rounded-3xl border border-blue-100 mb-8 shadow-2xl ring-1 ring-blue-200/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-base text-blue-700 font-semibold">Notifications</div>
              <div className="text-xs text-blue-400">Enable alerts for emergency broadcasts</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="form-checkbox accent-blue-600 scale-125" />
            </label>
          </div>

          <div className="space-y-3">
            <button onClick={() => setAboutOpen(true)} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl text-left font-semibold shadow hover:from-blue-600 hover:to-blue-700 transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
              <Info size={18} /> About ReliefMap
            </button>
            <button onClick={() => dispatch({ type: 'SET_ALERTS', payload: [] })} className="w-full bg-white border border-blue-200 py-3 rounded-2xl text-left text-blue-600 font-semibold hover:bg-blue-50 transition-all focus:outline-none focus:ring-2 focus:ring-blue-100">Clear Alerts (dev)</button>
          </div>
        </div>

        {!isGuest && (
          <div className="bg-gradient-to-r from-blue-400/20 to-blue-100/60 border border-blue-200 rounded-2xl p-4 text-center text-blue-700 text-base font-bold shadow-lg flex items-center justify-center gap-2">
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">Verified</span>
            <span>Google User &mdash; Thank you for helping the community!</span>
          </div>
        )}
      </div>

      {/* About Dialog */}
      {aboutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/95 rounded-3xl shadow-2xl max-w-lg w-full p-10 relative animate-fadeIn border border-blue-200">
            <button onClick={() => setAboutOpen(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-200">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-extrabold mb-7 text-blue-700 drop-shadow">About ReliefMap</h2>
            <div className="space-y-7">
              {faqs.map((faq, i) => (
                <div key={i}>
                  <div className="font-semibold text-blue-800 mb-1">Q: {faq.q}</div>
                  <div className="text-blue-600">A: {faq.a}</div>
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
