import React from 'react';
import { Compass, MapPin } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const CompassButton: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isLocating, setIsLocating] = React.useState(false);

  const handleClick = () => {
    if (state.userLocation) {
      dispatch({ type: 'SET_MAP_CENTER', payload: state.userLocation });
    } else if (navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          dispatch({ type: 'SET_USER_LOCATION', payload: loc });
          dispatch({ type: 'SET_MAP_CENTER', payload: loc });
          setIsLocating(false);
        },
        (err) => {
          alert('Unable to get your location.');
          setIsLocating(false);
        }
      );
    }
  };

  return (
    <div className="relative">
      {/* Pulse effect when locating */}
      {isLocating && (
        <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-30"></div>
      )}
      
      <button
        onClick={handleClick}
        className={`
          relative bg-gradient-to-br from-white to-gray-50 hover:from-orange-50 hover:to-orange-100 
          text-orange-500 rounded-full shadow-xl hover:shadow-2xl border-2 border-white/50 
          transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300/60 
          active:scale-95 backdrop-blur-md interactive
          ${isLocating ? 'animate-pulse-subtle' : ''}
        `}
        style={{
          width: '56px',
          height: '56px',
          minWidth: '56px',
          minHeight: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '4px',
        }}
        aria-label={isLocating ? "Getting your location..." : "Go to my location"}
        disabled={isLocating}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full blur-lg opacity-20 -z-10"></div>
        
        {isLocating ? (
          <div className="animate-spin">
            <MapPin size={28} className="text-orange-500 drop-shadow-sm" />
          </div>
        ) : (
          <Compass size={28} className="text-orange-500 drop-shadow-sm" />
        )}
        
        {/* Inner shadow for depth */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
      </button>
      
      {/* Status indicator */}
      {state.userLocation && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-white shadow-md">
          <div className="w-full h-full bg-green-500 rounded-full animate-pulse-subtle"></div>
        </div>
      )}
    </div>
  );
};

export default CompassButton;
