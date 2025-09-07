import React from 'react';
import { Compass } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const CompassButton: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const handleClick = () => {
    if (state.userLocation) {
      dispatch({ type: 'SET_MAP_CENTER', payload: state.userLocation });
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          dispatch({ type: 'SET_USER_LOCATION', payload: loc });
          dispatch({ type: 'SET_MAP_CENTER', payload: loc });
        },
        (err) => {
          alert('Unable to get your location.');
        }
      );
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white hover:bg-orange-100 text-orange-500 rounded-full shadow-xl border-2 border-white transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 focus:ring-opacity-60 active:scale-95"
      style={{
        width: '56px',
        height: '56px',
        minWidth: '56px',
        minHeight: '56px',
        boxShadow: '0 0 0 4px #fb923c80, 0 4px 16px 0 #0002',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '4px',
      }}
      aria-label="Go to my location"
    >
      <Compass size={28} color="#fb923c" />
    </button>
  );
};

export default CompassButton;
