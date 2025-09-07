import React from 'react';
import {
  MapPin,
  Bell,
  Users,
  Shield,
  Heart,
  AlertTriangle,
  Navigation,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';
import NotificationDemo from './NotificationDemo';
import WeatherWidget from './WeatherWidget';

const WelcomeSummaryPage: React.FC<{ onContinue: () => void }> = ({ onContinue }) => {
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
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Welcome to ReliefMap</h1>
            </div>
            <button
              onClick={onContinue}
              className="btn-secondary px-4 py-2 text-sm"
            >
              Skip to App →
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-4 pb-8">
          <div className="max-w-4xl mx-auto space-y-8">

            {/* Hero Welcome */}
            <div className="text-center animate-fadeIn">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Disaster Relief Hub
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Real-time mapping, emergency alerts, and community support when you need it most.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              {[
                { icon: <Users size={24} />, value: '1,200+', label: 'Active Users' },
                { icon: <MapPin size={24} />, value: '50+', label: 'Reports Today' },
                { icon: <Bell size={24} />, value: '15', label: 'Active Alerts' },
                { icon: <Shield size={24} />, value: '99.9%', label: 'Uptime' },
              ].map((stat, index) => (
                <div key={index} className="card-floating p-4 text-center">
                  <div className="text-blue-600 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Key Features */}
            <div className="card-floating p-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-600" />
                Key Features
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Real-time Mapping</h4>
                      <p className="text-sm text-gray-600">Live reports of help needed, safe zones, and resources</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bell size={16} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Emergency Alerts</h4>
                      <p className="text-sm text-gray-600">Instant notifications about critical updates in your area</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Community Support</h4>
                      <p className="text-sm text-gray-600">Connect with volunteers and get help from your community</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Navigation size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Navigation Help</h4>
                      <p className="text-sm text-gray-600">Get directions to safe zones and relief centers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="card-floating p-6 animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock size={20} className="text-blue-600" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <AlertTriangle size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Heavy rainfall warning issued for coastal districts</p>
                    <p className="text-xs text-gray-600">2 hours ago • Odisha Government</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New relief center opened in Bhubaneswar</p>
                    <p className="text-xs text-gray-600">4 hours ago • NDRF Team</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Community volunteers distributed 500 food packets</p>
                    <p className="text-xs text-gray-600">6 hours ago • Local NGO</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Demo */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <NotificationDemo />
            </div>

            {/* Current Weather */}
            <div className="animate-fadeIn" style={{ animationDelay: '0.5s' }}>
              <WeatherWidget showAlerts={true} />
            </div>

            {/* Quick Actions */}
            <div className="card-floating p-6 animate-fadeIn" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                  <MapPin size={20} className="text-blue-600 mb-2" />
                  <div className="font-medium text-gray-900">View Map</div>
                  <div className="text-sm text-gray-600">Explore relief locations</div>
                </button>
                <button className="p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors text-left">
                  <Bell size={20} className="text-red-600 mb-2" />
                  <div className="font-medium text-gray-900">Check Alerts</div>
                  <div className="text-sm text-gray-600">Latest emergency updates</div>
                </button>
                <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                  <Heart size={20} className="text-green-600 mb-2" />
                  <div className="font-medium text-gray-900">Get Help</div>
                  <div className="text-sm text-gray-600">Find support resources</div>
                </button>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="card-floating p-6 animate-fadeIn" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contacts</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">National Emergency</div>
                    <div className="text-sm text-gray-600">112</div>
                  </div>
                  <button className="btn-primary px-4 py-2 text-sm">Call</button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">Disaster Helpline</div>
                    <div className="text-sm text-gray-600">1077</div>
                  </div>
                  <button className="btn-secondary px-4 py-2 text-sm">Call</button>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-center animate-fadeIn" style={{ animationDelay: '0.8s' }}>
              <button
                onClick={onContinue}
                className="btn-primary px-8 py-4 text-lg"
              >
                Continue to ReliefMap →
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Stay informed, stay safe, help others
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSummaryPage;
