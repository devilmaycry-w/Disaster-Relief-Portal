import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const DirectionsTab: React.FC = () => {
  const { state } = useAppContext();
  const [destination, setDestination] = useState('');
  const [directionsUrl, setDirectionsUrl] = useState<string | null>(null);

  const handleGetDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !state.userLocation) return;
    // Use Google Maps Directions URL
    const url = `https://www.google.com/maps/dir/?api=1&origin=${state.userLocation.lat},${state.userLocation.lng}&destination=${encodeURIComponent(destination)}`;
    setDirectionsUrl(url);
    window.open(url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-md mx-auto mt-4">
      <form onSubmit={handleGetDirections} className="flex items-center space-x-2">
        <input
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Enter destination (address, place, etc.)"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
        >
          <Search size={18} className="mr-1" />
          <span>Go</span>
          <ArrowRight size={16} className="ml-1" />
        </button>
      </form>
      {directionsUrl && (
        <div className="mt-2 text-xs text-blue-600">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
      )}
    </div>
  );
};

export default DirectionsTab;
