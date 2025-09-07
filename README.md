# 🚨 ReliefMap - Disaster Relief Platform

> **ReliefMap** is a real-time disaster relief platform designed for flood emergencies, featuring interactive maps, live alerts, and weather integration. Built with React, Firebase, and Google Maps, it enables community coordination, emergency sharing via WhatsApp, and resource tracking—all optimized for desktop users.


[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.8-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.7.0-orange.svg)](https://firebase.google.com/)

## 🌟 **Key Features**

### 🖥️ **Desktop-Optimized Experience**
- **Smart Device Detection**: Automatically detects mobile devices and shows professional desktop-only message
- **Responsive Design**: Optimized for desktop browsers (Chrome, Firefox, Safari, Edge)
- **Cross-Platform**: Works seamlessly across Windows, Mac, and Linux

### 🔔 **Real Browser Notifications**
- **Live Notification System**: Functional browser notifications (not just placeholders!)
- **4 Notification Types**:
  - 🚨 **Emergency Alerts**: Critical flood warnings with location data
  - ⚠️ **Weather Updates**: Real-time weather conditions and forecasts
  - 📦 **Resource Updates**: New shelters, supplies, and relief centers
  - 🛡️ **Safety Tips**: Emergency preparedness and safety guidelines
- **Interactive Demo**: Test notifications with permission management
- **Auto-dismiss**: Non-critical notifications disappear after 5 seconds

### 🌐 **Google Maps Integration**
- **Smart Directions**: Get turn-by-turn directions from your current location to emergency sites
- **Location Validation**: Robust coordinate validation and error handling
- **Fallback Support**: Graceful degradation when user location is unavailable
- **Real-time Updates**: Automatic location detection with user permission
- **Cross-platform Compatibility**: Works on all devices with Google Maps access
- **Error Recovery**: Clear user feedback and troubleshooting guidance

### 📱 **WhatsApp Emergency Sharing**
- **Instant Alert Sharing**: Share emergency reports and alerts via WhatsApp
- **Detailed Information**: Includes reporter IP, exact location, and full description
- **Emergency Response Template**: Pre-formatted messages asking for help and coordination
- **Community Coordination**: Enable rapid information sharing during crises
- **Privacy-Aware**: Anonymous reporting with essential contact information

### 🌤️ **Real-Time Weather Integration**
- **OpenWeatherMap API**: Live weather data with free-tier compatibility
- **Weather Alerts**: Automatic flood risk detection based on conditions
- **Forecast Integration**: 5-day weather forecasts with precipitation alerts
- **Location-Based**: Weather data for user's current location
- **Visual Weather Widget**: Professional weather display with icons and details
- **Flood Risk Detection**: Smart alerts for high-risk weather conditions

### 🔗 **Functional Action Buttons**
- **"How to Stay Safe"**: Links to Wikipedia flood safety resources
- **"Support Relief Efforts"**: Direct links to American Red Cross donation portal
- **"Donate Now"**: Real donation pages for verified organizations
- **"Find Volunteer Opportunities"**: Links to Red Cross volunteer programs
- **All buttons are live and functional** - no more static placeholders!

### 🗺️ **Real-Time Mapping & Alerts**
- **Interactive Maps**: Powered by React-Leaflet with custom markers
- **Live Reports**: Real-time incident reporting and status updates
- **Emergency Alerts**: Critical notifications with location data
- **Resource Tracking**: Shelters, supplies, and relief centers

### � **Security Features**
- **Environment Variables**: All API keys stored securely in environment variables
- **Service Worker Security**: Firebase config passed securely without exposing keys
- **No Hardcoded Secrets**: Public files never contain sensitive API keys
- **Secure Communication**: PostMessage API used for service worker configuration

### 📱 **Apple-Level UI/UX**
- **Modern Design**: Clean, professional interface with custom gradients
- **Smooth Animations**: Fade-in effects and hover transitions
- **Accessibility**: WCAG compliant with ARIA labels and keyboard navigation
- **Mobile-First**: Responsive design with touch-friendly interactions

## 🚀 **Quick Start**

### Prerequisites
- **Node.js 18+**
- **npm 9+**
- **Modern Desktop Browser** (Chrome, Firefox, Safari, Edge)
- **Firebase Project** with Realtime Database and FCM enabled

### Installation
```bash
# Clone the repository
git clone https://github.com/devilmaycry-w/Disaster-Relief-Portal.git
cd disaster-relief-portal

# Install dependencies
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FCM_VAPID_KEY=your_vapid_key_here

# Weather API Configuration
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### Development
```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your desktop browser
```

### Build for Production
```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## 🏗️ **Architecture & Tech Stack**

### Frontend Framework
- **React 18** with TypeScript for type safety
- **Vite** for lightning-fast development and building
- **React Router** for client-side navigation

### Styling & UI
- **Tailwind CSS** with custom design system
- **Lucide React** for consistent iconography
- **Custom gradients** and animations
- **Responsive breakpoints** for all screen sizes

### Backend & Database
- **Firebase Realtime Database** for real-time data sync
- **Firebase Cloud Messaging (FCM)** for push notifications
- **Firebase Authentication** for secure user management
- **OpenWeatherMap API** for real-time weather data and forecasts
- **OpenStreetMap Nominatim** for location search and geocoding

### Maps & Location
- **React-Leaflet** for interactive mapping
- **Geolocation API** for automatic location detection
- **Custom markers** and popups for reports and alerts
- **Weather map overlays** for precipitation and cloud data

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Vite plugins** for optimization

## 🔗 **APIs & External Services**

### **OpenWeatherMap API**
- **Purpose**: Real-time weather data and flood risk detection
- **Features Used**:
  - Current weather conditions (temperature, humidity, wind, pressure)
  - 5-day weather forecasts with precipitation data
  - Weather icons and descriptions
  - Air quality data (future integration)
- **Free Tier**: 1,000 API calls/day, 60 calls/minute
- **Implementation**: Custom weather service with error handling and caching

### **Firebase Services**
- **Authentication**: Google OAuth for secure user login
- **Realtime Database**: Live synchronization of reports and alerts
- **Cloud Messaging**: Browser push notifications with VAPID keys
- **Hosting**: Production deployment (optional)

### **OpenStreetMap Services**
- **Nominatim API**: Location search and geocoding
- **Tile Server**: Map tiles for React-Leaflet integration
- **No API Key Required**: Free for development and production use

### **Browser APIs**
- **Geolocation API**: Automatic user location detection
- **Notification API**: Native browser push notifications
- **Clipboard API**: Share alert functionality
- **Web Share API**: Native sharing on mobile devices

## 📁 **Project Structure**

```
src/
├── components/           # UI Components
│   ├── DesktopOnly.tsx   # Desktop-only detection
│   ├── NotificationDemo.tsx # Notification testing
│   ├── WeatherWidget.tsx # Real-time weather display
│   ├── FloodAwarenessPage.tsx # Educational content
│   ├── WelcomeSummaryPage.tsx # Onboarding summary
│   ├── Map/              # Mapping components
│   │   ├── MapContainer.tsx # Main map component
│   │   ├── FilterBar.tsx # Map filtering controls
│   │   └── WeatherWidget.tsx # Weather overlay
│   ├── Alerts/           # Alert system
│   │   ├── AlertsModal.tsx # Emergency alerts with Google Maps & WhatsApp
│   │   └── AlertBanner.tsx # Alert notifications
│   ├── Forms/            # Form components
│   │   └── ReportModal.tsx # Incident reporting
│   ├── Layout/           # Layout components
│   │   └── Header.tsx    # App header with alerts
│   ├── Reports/          # Report management
│   │   └── ReportDetails.tsx # Report details with navigation & sharing
│   └── UI/               # Reusable UI components
│       ├── BottomNav.tsx # Bottom navigation
│       ├── FloatingActionButton.tsx # FAB for reports
│       └── LoadingSpinner.tsx # Loading indicators
├── contexts/             # Global state management
│   └── AppContext.tsx    # Main app state
├── services/             # API services
│   └── weatherService.ts # OpenWeatherMap integration
├── types/                # TypeScript definitions
│   └── index.ts          # Type definitions
├── firebase.ts           # Firebase configuration
└── main.tsx             # App entry point
```

## 🎯 **Core Functionality**

### 1. **Smart Onboarding Flow**
```
Splash Screen → Welcome Summary → Flood Awareness → Main App
```

### 2. **Real-Time Features**
- **Live Map Updates**: Reports appear instantly
- **Emergency Alerts**: Critical notifications with location
- **Resource Tracking**: Shelter and supply updates
- **Community Coordination**: Volunteer and donation coordination

### 3. **Educational Content**
- **2022 Odisha Floods**: Real case study with statistics
- **Safety Guidelines**: Comprehensive emergency preparedness
- **Interactive Tabs**: Overview, Impact, Response, Safety Tips, Help

### 4. **Notification System**
- **Browser API Integration**: Native notification support
- **Permission Management**: User-friendly permission requests
- **Demo Mode**: Test all notification types
- **Firebase Ready**: Production notification infrastructure

## 🧪 **Testing the Features**

### Desktop-Only Detection
1. Open app in desktop browser → Works normally
2. Try mobile device → Shows professional desktop-only message
3. Resize desktop window small → Triggers mobile detection

### Notification System
1. Navigate to Welcome Summary page
2. Find "Notification System" section
3. Click "Enable Notifications"
4. Test "Single Notification" or "Run Full Demo"
5. See real browser notifications appear!

### Functional Buttons
1. Go to Flood Awareness page
2. Click any action button
3. Opens real external websites (Wikipedia, Red Cross, etc.)

## 🔧 **Configuration**

### Firebase Setup
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication (Google provider)
3. Enable Realtime Database
4. Enable Cloud Messaging (FCM)
5. Generate VAPID key for notifications

### Environment Variables
All Firebase configuration is handled through environment variables for security.

## 🌟 **Hackathon Highlights**

### ✅ **Production-Ready Features**
- **Real notifications** (not just console logs!)
- **Functional external links** (Wikipedia, Red Cross)
- **Live weather data** from OpenWeatherMap API
- **Smart Google Maps directions** from current location to emergencies
- **WhatsApp sharing** for emergency coordination
- **Professional UI/UX** with custom design
- **Firebase integration** for real-time data
- **Desktop optimization** for focused user experience
- **Multiple API integrations** (Weather, Maps, Notifications)

### ✅ **Technical Excellence**
- **TypeScript** for type safety
- **Modern React patterns** (hooks, context)
- **Responsive design** with Tailwind CSS
- **Accessibility compliance** (WCAG standards)
- **Performance optimized** with Vite

### ✅ **User Experience**
- **Intuitive onboarding** flow
- **Educational content** about real disasters
- **Emergency preparedness** resources
- **Community coordination** tools
- **Professional presentation** for stakeholders

## 🤝 **Contributing**

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **American Red Cross** for emergency response resources
- **Wikipedia** for educational content
- **OpenWeatherMap** for real-time weather data and APIs
- **OpenStreetMap** for mapping infrastructure
- **Firebase** for backend infrastructure
- **Open-source community** for amazing tools and libraries


**Built with ❤️ for communities in crisis.** 🚨🆘

---

*Developed for disaster relief and emergency response coordination.*
