import React, { useState } from 'react';
import { AlertTriangle, Home, Droplets, Users as UsersIcon, Map, Shield, Heart, MapPin } from 'lucide-react';

const FloodAwarenessPage: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen w-full relative bg-gradient-to-br from-blue-50 via-white to-blue-100/60">
      {/* Radial Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 50% 90%, #fff 40%, #6366f1 100%)",
        }}
      />

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={onContinue}
              className="btn-secondary px-4 py-2 text-sm"
            >
              Skip to App →
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="card-floating p-8 mb-8 animate-fadeIn">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-20 h-20 mx-auto animate-pulse-subtle opacity-20"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-full w-20 h-20 mx-auto flex items-center justify-center shadow-2xl">
                  <Droplets size={32} className="text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                2022 Odisha Floods: What Happened & What You Need to Know
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                A real-time resource hub on impact, rescue efforts, and safety guidance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.open('https://en.wikipedia.org/wiki/Flood_safety', '_blank')}
                  className="btn-primary px-6 py-3 hover:scale-105 transition-transform"
                >
                  How to Stay Safe
                </button>
                <button
                  onClick={() => window.open('https://www.redcross.org/get-help/how-to-prepare-for-emergencies/types-of-emergencies/flood.html', '_blank')}
                  className="btn-secondary px-6 py-3 hover:scale-105 transition-transform"
                >
                  Support Relief Efforts
                </button>
              </div>
            </div>

            {/* Tabbed Information Section */}
            <div className="card-floating p-6 mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {[
                  { key: 'overview', label: 'Overview', icon: <Home size={18} /> },
                  { key: 'impact', label: 'Impact', icon: <AlertTriangle size={18} /> },
                  { key: 'response', label: 'Response', icon: <Shield size={18} /> },
                  { key: 'safety', label: 'Safety Tips', icon: <MapPin size={18} /> },
                  { key: 'help', label: 'How to Help', icon: <Heart size={18} /> },
                ].map(tab => (
                  <button
                    key={tab.key}
                    className={`flex items-center gap-2 py-3 px-4 font-medium text-sm whitespace-nowrap ${
                      activeTab === tab.key ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="min-h-[300px]">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Overview</h3>
                    <p className="text-gray-700 mb-4">
                      The 2022 Odisha floods were a series of floods in Odisha, lasting from 14 August 2022 to 7 September 2022. The main causes were extensive rains from the 3rd week of August 2022, due to the formation of 3 depression systems over the Bay of Bengal and monsoon rains.
                    </p>
                    <p className="text-gray-700">
                      Twelve districts were primarily affected: Khordha, Cuttack, Jagatsinghpur, Kendrapara, Puri, Balasore, Mayurbhanj, Subarnapur, Bargarh, Angul, Boudh, and Sambalpur.
                    </p>
                  </div>
                )}
                {activeTab === 'impact' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Impact</h3>
                    <ol className="space-y-2 text-gray-700 text-center">
  <li>• 1 million people affected from 1,757 villages</li>
  <li>• 126,000 hectares of cropland damaged</li>
  <li>• 250,000 people marooned</li>
  <li>• 7 deaths reported</li>
  <li>• Over 14,000 houses damaged or destroyed</li>
  <li>• ₹126 crore in public property damage</li>
</ol>

                  </div>
                )}
                {activeTab === 'response' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Response</h3>
                    <p className="text-gray-700 mb-4">
                      The Odisha government dispatched financial aid of ₹128.8 crore to restore damaged properties and conduct relief operations. To conduct relief operations, 11 teams of National Disaster Response Force (NDRF), 12 teams of Odisha Disaster Rapid Action Force (ODRAF), and 52 teams of Odisha Fire Services were arranged.
                    </p>
                    <p className="text-gray-700">
                      440 relief centers were established across the affected districts.
                    </p>
                  </div>
                )}
                {activeTab === 'safety' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Safety Tips</h3>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Stay informed through official weather alerts</li>
                      <li>• Avoid low-lying areas during heavy rains</li>
                      <li>• Keep emergency supplies ready (water, food, medicines)</li>
                      <li>• Do not drink flood water; use boiled or bottled water</li>
                      <li>• Follow evacuation instructions from authorities</li>
                      <li>• Keep important documents in waterproof containers</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'help' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">How to Help</h3>
                    <p className="text-black-700 mb-4">
                      You can contribute to relief efforts by donating to verified organizations, volunteering, or spreading awareness.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => window.open('https://www.redcross.org/donate/donation.html/', '_blank')}
                        className="btn-primary px-6 py-3 hover:scale-105 transition-transform"
                      >
                        Donate Now
                      </button>
                      <button
                        onClick={() => window.open('https://www.redcross.org/get-involved/volunteer.html', '_blank')}
                        className="btn-secondary px-6 py-3 hover:scale-105 transition-transform"
                      >
                        Find Volunteer Opportunities
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: <UsersIcon size={24} />, value: '1M', label: 'People Affected' },
                { icon: <AlertTriangle size={24} />, value: '7', label: 'Deaths' },
                { icon: <Home size={24} />, value: '14K', label: 'Homes Damaged' },
                { icon: <Map size={24} />, value: '126K', label: 'Hectares Lost' },
              ].map((stat, index) => (
                <div key={index} className="card-floating p-4 text-center">
                  <div className="text-blue-600 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={onContinue}
                className="btn-primary px-8 py-4 text-lg"
              >
                Continue to ReliefMap →
              </button>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-500 mt-8 animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              <p>Sources: The Hindu, NDTV, Odisha TV, Weather Channel</p>
              <p>Emergency: Call 112 for immediate assistance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloodAwarenessPage;
