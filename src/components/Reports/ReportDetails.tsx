import React from 'react';
import { X, MapPin, Clock, Phone, Users, CheckCircle, AlertCircle, Navigation } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const ReportDetails: React.FC = () => {
  const { state, dispatch } = useAppContext();

  if (!state.selectedReport) return null;

  const report = state.selectedReport;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} days ago`;
  };

  const getTypeInfo = (type: string) => {
    const types = {
      'help-needed': {
        label: 'Help Needed',
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: AlertCircle,
        description: 'Emergency assistance required',
      },
      'medical': {
        label: 'Medical Aid',
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: CheckCircle,
        description: 'Medical help or facility available',
      },
      'safe-zone': {
        label: 'Safe Zone',
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: CheckCircle,
        description: 'Safe shelter or protected area',
      },
      'resources': {
        label: 'Resources',
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: CheckCircle,
        description: 'Supplies and resources available',
      },
      'volunteer': {
        label: 'Volunteers',
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: Users,
        description: 'Volunteer assistance available',
      },
    };
    return types[type as keyof typeof types] || types['help-needed'];
  };

  const getPriorityInfo = (priority: string) => {
    const priorities = {
      critical: { color: 'bg-red-500 text-white', label: 'CRITICAL' },
      high: { color: 'bg-orange-500 text-white', label: 'HIGH' },
      medium: { color: 'bg-yellow-500 text-black', label: 'MEDIUM' },
      low: { color: 'bg-green-500 text-white', label: 'LOW' },
    };
    return priorities[priority as keyof typeof priorities] || priorities.medium;
  };

  const typeInfo = getTypeInfo(report.type);
  const priorityInfo = getPriorityInfo(report.priority);
  const TypeIcon = typeInfo.icon;

  const handleNavigate = () => {
    const { lat, lng } = report.location;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    if (report.contact) {
      window.location.href = `tel:${report.contact}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-t-2xl md:rounded-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-200">
          <div className="flex-1 pr-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${typeInfo.color}`}>
                <TypeIcon size={16} className="mr-1" />
                {typeInfo.label}
              </span>
              <span className={`px-2 py-1 rounded text-xs font-bold ${priorityInfo.color}`}>
                {priorityInfo.label}
              </span>
              {report.verified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <CheckCircle size={12} className="mr-1" />
                  Verified
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">{report.title}</h2>
            <p className="text-sm text-gray-600">{typeInfo.description}</p>
          </div>
          <button
            onClick={() => dispatch({ type: 'SET_SELECTED_REPORT', payload: null })}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[calc(90vh-140px)] overflow-y-auto">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-700 leading-relaxed">{report.description}</p>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin size={18} className="text-blue-500" />
                <span className="font-medium text-gray-900">
                  {report.location.address || `${report.location.lat.toFixed(4)}, ${report.location.lng.toFixed(4)}`}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Coordinates: {report.location.lat.toFixed(6)}, {report.location.lng.toFixed(6)}
              </p>
              <button
                onClick={handleNavigate}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Navigation size={16} className="mr-2" />
                Get Directions
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Information */}
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">Time Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-500" />
                  <span className="text-gray-600">Reported:</span>
                  <span className="font-medium">{formatTimeAgo(report.createdAt)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium capitalize text-green-600">{report.status}</span>
                </div>
              </div>
            </div>

            {/* Capacity & Resources */}
            {(report.capacity || report.resourceType) && (
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-2">Details</h4>
                <div className="space-y-2 text-sm">
                  {report.capacity && (
                    <div className="flex items-center space-x-2">
                      <Users size={16} className="text-gray-500" />
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{report.capacity} people</span>
                    </div>
                  )}
                  {report.resourceType && (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{report.resourceType}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Information */}
          {report.contact && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone size={18} className="text-blue-500" />
                    <span className="font-medium text-gray-900">{report.contact}</span>
                  </div>
                  <button
                    onClick={handleCall}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Emergency Notice */}
          {report.priority === 'critical' && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertCircle size={20} />
                <span className="font-semibold">Critical Emergency</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                This is a critical emergency situation requiring immediate attention.
                Please contact emergency services if you can provide assistance.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={handleNavigate}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Navigation size={18} className="mr-2" />
              Navigate
            </button>
            {report.contact && (
              <button
                onClick={handleCall}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Phone size={18} className="mr-2" />
                Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;