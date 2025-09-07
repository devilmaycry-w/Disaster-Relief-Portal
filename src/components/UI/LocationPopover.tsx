import React from 'react';

interface LocationPopoverProps {
  open: boolean;
  onRetry: () => void;
}

const LocationPopover: React.FC<LocationPopoverProps> = ({ open, onRetry }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-xs w-full text-center animate-scaleIn">
        <div className="mb-3 text-3xl text-blue-500">
          <span className="material-symbols-rounded" style={{ fontSize: 48 }}>
            location_off
          </span>
        </div>
        <h2 className="text-title mb-2">Location Required</h2>
        <p className="text-body mb-4 text-gray-600">
          This app needs your location to work. Please allow location access in your browser settings.
        </p>
        <button
          className="btn-primary w-full"
          onClick={onRetry}
          aria-label="Retry location access"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default LocationPopover;
