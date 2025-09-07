import React, { useEffect, useRef, useState } from 'react';
import CompassButton from '../UI/CompassButton';
import { Search } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useAppContext } from '../../contexts/AppContext';
import { Report } from '../../types';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different report types
const createIcon = (type: string, priority: string) => {
  const colors = {
    'help-needed': '#DC3545', // Red
    'medical': '#FD7E14', // Orange
    'safe-zone': '#28A745', // Green
    'resources': '#007BFF', // Blue
    'volunteer': '#6F42C1', // Purple
  };

  const size = priority === 'critical' ? 30 : priority === 'high' ? 25 : 20;
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div style="
        background-color: ${colors[type as keyof typeof colors] || '#6C757D'};
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${size > 20 ? '14px' : '12px'};
      ">
        ${getIconSymbol(type)}
      </div>
    `,
    iconSize: [size + 6, size + 6],
    iconAnchor: [(size + 6) / 2, (size + 6) / 2],
  });
};

const getIconSymbol = (type: string) => {
  const symbols = {
    'help-needed': '!',
    'medical': '+',
    'safe-zone': '✓',
    'resources': '◊',
    'volunteer': '♦',
  };
  return symbols[type as keyof typeof symbols] || '●';
};

// Component to handle map events and user location
const MapController: React.FC = () => {
  const map = useMap();
  const { state } = useAppContext();

  useEffect(() => {
    if (state.mapCenter) {
      map.setView([state.mapCenter.lat, state.mapCenter.lng], 13);
    } else if (state.userLocation) {
      map.setView([state.userLocation.lat, state.userLocation.lng], 13);
    }
  }, [state.userLocation, state.mapCenter, map]);

  return null;
};

// Component to filter and display markers
const MapMarkers: React.FC = () => {
  const { state, dispatch } = useAppContext();

  const filteredReports = state.reports.filter(report => 
    state.activeFilters.includes('all') || state.activeFilters.includes(report.type)
  );

  const handleMarkerClick = (report: Report) => {
    dispatch({ type: 'SET_SELECTED_REPORT', payload: report });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      critical: 'bg-red-500 text-white',
      high: 'bg-orange-500 text-white',
      medium: 'bg-yellow-500 text-black',
      low: 'bg-green-500 text-white',
    };
    return badges[priority as keyof typeof badges] || badges.medium;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'help-needed': 'Help Needed',
      'medical': 'Medical Aid',
      'safe-zone': 'Safe Zone',
      'resources': 'Resources',
      'volunteer': 'Volunteers',
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <>
      {filteredReports.map((report) => (
        <Marker
          key={report.id}
          position={[report.location.lat, report.location.lng]}
          icon={createIcon(report.type, report.priority)}
          eventHandlers={{
            click: () => handleMarkerClick(report),
          }}
        >
          <Popup className="custom-popup">
            <div className="p-2 max-w-xs">
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityBadge(report.priority)}`}>
                  {report.priority.toUpperCase()}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(report.createdAt)}
                </span>
              </div>
              
              <h3 className="font-bold text-sm mb-1">{report.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{getTypeLabel(report.type)}</p>
              <p className="text-sm text-gray-700 mb-2">{report.description}</p>
              
              {report.location.address && (
                <p className="text-xs text-gray-500 mb-2">📍 {report.location.address}</p>
              )}
              
              {report.contact && (
                <p className="text-xs text-blue-600 mb-2">📞 {report.contact}</p>
              )}
              
              {report.capacity && (
                <p className="text-xs text-gray-600">Capacity: {report.capacity}</p>
              )}
              
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                <button
                  onClick={() => handleMarkerClick(report)}
                  className="text-blue-600 text-xs font-medium hover:underline"
                >
                  View Details
                </button>
                {report.verified && (
                  <span className="text-green-600 text-xs">✓ Verified</span>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const ReliefMap: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const mapRef = useRef<L.Map>(null);
  const [search, setSearch] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const defaultCenter: [number, number] = state.userLocation 
    ? [state.userLocation.lat, state.userLocation.lng]
    : [40.7128, -74.0060]; // Default to NYC

  // Search for a place using Nominatim API
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    setSearchLoading(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const loc = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        dispatch({ type: 'SET_MAP_CENTER', payload: loc });
        if (mapRef.current) {
          mapRef.current.setView([loc.lat, loc.lng], 15);
        }
      } else {
        alert('Place not found.');
      }
    } catch {
      alert('Search failed.');
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="absolute top-4 left-1/2 z-30 -translate-x-1/2 w-[90vw] max-w-md flex bg-white rounded-full shadow-lg border border-gray-200 px-2 py-1 items-center gap-2">
        <Search size={18} className="text-blue-500" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search place..."
          className="flex-1 bg-transparent outline-none px-2 py-1 text-sm"
        />
        <button type="submit" className="text-blue-600 font-semibold px-3 py-1 rounded-full hover:bg-blue-50 transition-all disabled:opacity-60" disabled={searchLoading}>
          {searchLoading ? '...' : 'Go'}
        </button>
      </form>

      <MapContainer
        ref={mapRef}
        center={defaultCenter}
        zoom={13}
        className="w-full h-full z-10"
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          className="map-tiles"
        />
        <MapController />
        <MapMarkers />
        {/* User location marker */}
        {state.userLocation && (
          <Marker 
            position={[state.userLocation.lat, state.userLocation.lng]}
            icon={L.divIcon({
              className: 'user-location-marker',
              html: `
                <div style="
                  background-color: #007BFF;
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 0 0 2px #007BFF40;
                "></div>
              `,
              iconSize: [22, 22],
              iconAnchor: [11, 11],
            })}
          >
            <Popup>Your Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Loading overlay */}
      {state.isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Loading relief data...</p>
          </div>
        </div>
      )}

      {/* Compass and + button area */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 md:bottom-8 md:right-8">
        <CompassButton />
        {/* The + button will appear below this, so they stack vertically */}
      </div>
    </div>
  );
};

export default ReliefMap;