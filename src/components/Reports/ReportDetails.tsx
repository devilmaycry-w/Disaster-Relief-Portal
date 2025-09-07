import React, { useMemo, useCallback } from 'react';
import { X, MapPin, Clock, Phone, Users, CheckCircle, AlertCircle, Navigation, Share2 } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const ReportDetails: React.FC = React.memo(() => {
  const { state, dispatch } = useAppContext();

  // Memoize expensive computations
  const typeInfo = useMemo(() => {
    if (!state.selectedReport) return null;

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
    return types[state.selectedReport.type as keyof typeof types] || types['help-needed'];
  }, [state.selectedReport]);

  const priorityInfo = useMemo(() => {
    if (!state.selectedReport) return null;

    const priorities = {
      critical: { color: 'bg-red-500 text-white', label: 'CRITICAL' },
      high: { color: 'bg-orange-500 text-white', label: 'HIGH' },
      medium: { color: 'bg-yellow-500 text-black', label: 'MEDIUM' },
      low: { color: 'bg-green-500 text-white', label: 'LOW' },
    };
    return priorities[state.selectedReport.priority as keyof typeof priorities] || priorities.medium;
  }, [state.selectedReport]);

  const timeAgo = useMemo(() => {
    if (!state.selectedReport) return '';

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
    return formatTimeAgo(state.selectedReport.createdAt);
  }, [state.selectedReport]);

  const locationInfo = useMemo(() => {
    if (!state.selectedReport) return '';

    return state.selectedReport.location.address
      ? `📍 Location: ${state.selectedReport.location.address} (${state.selectedReport.location.lat.toFixed(4)}, ${state.selectedReport.location.lng.toFixed(4)})`
      : `📍 Location: ${state.selectedReport.location.lat.toFixed(4)}, ${state.selectedReport.location.lng.toFixed(4)}`;
  }, [state.selectedReport]);

  const shareText = useMemo(() => {
    if (!state.selectedReport || !typeInfo) return '';

    const userIP = '192.168.1.100'; // In real app, this would come from backend

    return `🚨 URGENT REPORT 🚨

📢 ${typeInfo.label}: ${state.selectedReport.title}
📝 Description: ${state.selectedReport.description}
${locationInfo}
👤 Reported by: Anonymous user (IP: ${userIP})
⏰ Time: ${state.selectedReport.createdAt.toLocaleString()}
📊 Status: ${state.selectedReport.status.toUpperCase()}
🚨 Priority: ${state.selectedReport.priority.toUpperCase()}

${state.selectedReport.contact ? `📞 Contact: ${state.selectedReport.contact}` : ''}
${state.selectedReport.capacity ? `👥 Capacity: ${state.selectedReport.capacity} people` : ''}
${state.selectedReport.resourceType ? `📦 Resource Type: ${state.selectedReport.resourceType}` : ''}

⚠️ This report requires immediate attention!

Please help by:
• Contacting the reporter if you can assist
• Sharing this information with relevant authorities
• Providing support if you have relevant resources
• Staying safe and following official guidelines

#EmergencyReport #DisasterRelief #ReliefMap`;
  }, [state.selectedReport, typeInfo, locationInfo]);

  // Memoize event handlers
  const handleClose = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_REPORT', payload: null });
  }, [dispatch]);

  const handleNavigate = useCallback(() => {
    if (!state.selectedReport) return;

    console.log('Report location:', state.selectedReport.location);
    console.log('User location:', state.userLocation);

    const userLocation = state.userLocation;
    const { lat, lng } = state.selectedReport.location;

    // Validate coordinates
    if (typeof lat !== 'number' || typeof lng !== 'number' || isNaN(lat) || isNaN(lng)) {
      console.error('Invalid report coordinates:', lat, lng);
      window.alert('Invalid location coordinates for this report.');
      return;
    }

    let url;
    if (userLocation && typeof userLocation.lat === 'number' && typeof userLocation.lng === 'number' && !isNaN(userLocation.lat) && !isNaN(userLocation.lng)) {
      // Get directions from current location to destination
      url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${lat},${lng}`;
      console.log('Using directions URL:', url);
    } else {
      // Fallback to just showing destination with zoom
      url = `https://www.google.com/maps?q=${lat},${lng}&ll=${lat},${lng}&z=15`;
      console.log('Using location URL (no user location):', url);
      window.alert('Using destination location only. For turn-by-turn directions, please refresh the page to detect your location.');
    }

    window.open(url, '_blank');
  }, [state.selectedReport, state.userLocation]);

  const handleCall = useCallback(() => {
    if (state.selectedReport?.contact) {
      window.location.href = `tel:${state.selectedReport.contact}`;
    }
  }, [state.selectedReport]);

  const handleShare = useCallback(() => {
    // Create WhatsApp share URL
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  }, [shareText]);

  if (!state.selectedReport || !typeInfo || !priorityInfo) return null;

  const report = state.selectedReport;
  const TypeIcon = typeInfo.icon;  return (
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
            onClick={handleClose}
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
                  <span className="font-medium">{timeAgo}</span>
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
            <button
              onClick={handleShare}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
            >
              <Share2 size={18} className="mr-2" />
              Share on WhatsApp
            </button>
            {report.contact && (
              <button
                onClick={handleCall}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
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
});

export default ReportDetails;