import React, { useState, useEffect } from 'react';
import { X, MapPin, AlertCircle } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { addReport as addReportToDb, addAlert as addAlertToDb } from '../../firebase';
import { Report } from '../../types';

const ReportModal: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState({
    type: 'help-needed',
    title: '',
    description: '',
    city: '',
    priority: 'medium',
    contact: '',
    resourceType: '',
    capacity: '',
    location: state.userLocation || { lat: 40.7128, lng: -74.0060 },
    useCurrentLocation: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (state.userLocation && formData.useCurrentLocation) {
      setFormData(prev => ({ ...prev, location: state.userLocation! }));
    }
  }, [state.userLocation, formData.useCurrentLocation]);

  const reportTypes = [
    { value: 'help-needed', label: 'Help Needed', description: 'Emergency assistance required' },
    { value: 'medical', label: 'Medical Aid', description: 'Medical help or facility' },
    { value: 'safe-zone', label: 'Safe Zone', description: 'Safe shelter or area' },
    { value: 'resources', label: 'Resources', description: 'Food, water, supplies' },
    { value: 'volunteer', label: 'Volunteer Needed', description: 'Volunteer help required' },
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-800' },
    { value: 'critical', label: 'Critical', color: 'bg-red-100 text-red-800' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.type === 'resources' && !formData.resourceType.trim()) {
      newErrors.resourceType = 'Resource type is required';
    }

    if (formData.capacity && isNaN(Number(formData.capacity))) {
      newErrors.capacity = 'Capacity must be a number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dispatch({ type: 'SET_SUBMITTING', payload: true });

      try {
        // Push report to Realtime DB
    const payload = {
      type: formData.type,
      title: formData.title,
      description: formData.description,
      city: formData.city,
      location: {
        lat: formData.location.lat,
        lng: formData.location.lng,
        address: `${formData.location.lat.toFixed(4)}, ${formData.location.lng.toFixed(4)}`,
      },
      status: 'active',
      priority: formData.priority,
      contact: formData.contact || null,
      resourceType: formData.resourceType || null,
      capacity: formData.capacity ? Number(formData.capacity) : null,
      verified: false,
    };

      try {
        const id = await addReportToDb(payload);
        // also create an alert entry so it shows in Alerts tab
        try {
          await addAlertToDb({ title: formData.title || 'New report', message: formData.description || '', location: { lat: formData.location.lat, lng: formData.location.lng }, reportId: id });
        } catch (err) {
          console.warn('Failed to add alert to RTDB, will fallback to local state', err);
          dispatch({ type: 'ADD_ALERT', payload: { id: `local-alert-${Date.now()}`, title: formData.title || 'New report', message: formData.description || '', location: { lat: formData.location.lat, lng: formData.location.lng }, reportId: id } as any });
        }
      } catch (err) {
        // If Firebase unavailable, fall back to local dispatch for UX (report + alert)
        console.warn('Failed to add report to RTDB, falling back to local state', err);
        const fallbackReport: Report = {
          id: Date.now().toString(),
          type: formData.type as any,
          title: formData.title,
          description: formData.description,
          location: {
            lat: formData.location.lat,
            lng: formData.location.lng,
            address: `${formData.location.lat.toFixed(4)}, ${formData.location.lng.toFixed(4)}`,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'active',
          priority: formData.priority as any,
          contact: formData.contact || undefined,
          resourceType: formData.resourceType || undefined,
          capacity: formData.capacity ? Number(formData.capacity) : undefined,
          verified: false,
        };
        dispatch({ type: 'ADD_REPORT', payload: fallbackReport });
        dispatch({ type: 'ADD_ALERT', payload: { id: `local-alert-${Date.now()}`, title: formData.title || 'New report', message: formData.description || '', location: { lat: formData.location.lat, lng: formData.location.lng }, reportId: fallbackReport.id } as any });
      }

      dispatch({ type: 'TOGGLE_REPORT_MODAL', payload: false });
      
      // Reset form
      setFormData({
        type: 'help-needed',
        title: '',
        description: '',
        city: '',
        priority: 'medium',
        contact: '',
        resourceType: '',
        capacity: '',
        location: state.userLocation || { lat: 40.7128, lng: -74.0060 },
        useCurrentLocation: true,
      });
      setErrors({});
      
    } catch (error) {
      console.error('Failed to submit report:', error);
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
    }
  };

  const handleLocationToggle = () => {
    setFormData(prev => ({
      ...prev,
      useCurrentLocation: !prev.useCurrentLocation,
      location: !prev.useCurrentLocation && state.userLocation 
        ? state.userLocation 
        : prev.location
    }));
  };

  if (!state.showReportModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-end md:items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn">
      <div className="card-floating w-full max-w-lg max-h-[95vh] overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 glass-strong z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900 text-title">Submit Report</h2>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_REPORT_MODAL', payload: false })}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 interactive"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6 max-h-[calc(95vh-64px)] overflow-y-auto scrollbar-hide">
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6 max-h-[calc(95vh-80px)] overflow-y-auto scrollbar-custom">
          {/* Report Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-4 text-caption">
              Report Type *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reportTypes.map(type => (
                <label
                  key={type.value}
                  className={`
                    flex items-start space-x-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 interactive
                    ${formData.type === type.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={type.value}
                    checked={formData.type === type.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-caption">{type.label}</div>
                    <div className="text-sm text-gray-600 text-body">{type.description}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Brief, clear title for your report"
              className={`
                input-field w-full
                ${errors.title ? 'border-red-500' : 'border-gray-300'}
              `}
              maxLength={100}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.title}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              placeholder="Enter city name (optional)"
              className="input-field w-full"
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide detailed information about the situation"
              rows={4}
              className={`
                input-field w-full resize-none
                ${errors.description ? 'border-red-500' : 'border-gray-300'}
              `}
              maxLength={500}
            />
            <div className="flex justify-between mt-1">
              {errors.description && (
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.description}
                </p>
              )}
              <p className="text-xs text-gray-500 ml-auto">
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3 text-caption">
              Priority Level
            </label>
            <div className="flex flex-wrap gap-3">
              {priorityLevels.map(priority => (
                <label
                  key={priority.value}
                  className={`
                    flex items-center space-x-2 px-4 py-3 border-2 rounded-xl cursor-pointer transition-all duration-200 interactive
                    ${formData.priority === priority.value
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <input
                    type="radio"
                    value={priority.value}
                    checked={formData.priority === priority.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                  />
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priority.color}`}>
                    {priority.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Fields */}
          {formData.type === 'resources' && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
                Resource Type *
              </label>
              <input
                type="text"
                value={formData.resourceType}
                onChange={(e) => setFormData(prev => ({ ...prev, resourceType: e.target.value }))}
                placeholder="e.g., Food, Water, Medicine, Clothing"
                className={`
                  input-field w-full
                  ${errors.resourceType ? 'border-red-500' : 'border-gray-300'}
                `}
              />
              {errors.resourceType && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.resourceType}
                </p>
              )}
            </div>
          )}

          {(formData.type === 'safe-zone' || formData.type === 'medical' || formData.type === 'resources') && (
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
                Capacity
              </label>
              <input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                placeholder="Number of people that can be accommodated"
                className={`
                  input-field w-full
                  ${errors.capacity ? 'border-red-500' : 'border-gray-300'}
                `}
                min="1"
              />
              {errors.capacity && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={16} className="mr-1" />
                  {errors.capacity}
                </p>
              )}
            </div>
          )}

          {/* Contact Information */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
              Contact Information
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData(prev => ({ ...prev, contact: e.target.value }))}
              placeholder="Phone number or other contact info (optional)"
              className="input-field w-full"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 text-caption">
              Location
            </label>
            <div className="space-y-4">
              <label className="flex items-center space-x-3 cursor-pointer p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.useCurrentLocation}
                  onChange={handleLocationToggle}
                  className="rounded text-blue-600"
                />
                <span className="text-sm font-medium text-gray-700">Use my current location</span>
                <MapPin size={16} className="text-blue-500" />
              </label>
              
              {formData.location && (
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <p className="text-sm text-blue-700 font-medium">
                    📍 {formData.location.lat.toFixed(4)}, {formData.location.lng.toFixed(4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 glass-strong pt-6 border-t border-gray-200 rounded-b-2xl">
            <button
              type="submit"
              disabled={state.isSubmitting}
              className="w-full btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {state.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  Submitting Report...
                </>
              ) : (
                'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportModal;