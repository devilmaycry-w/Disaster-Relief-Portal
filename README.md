# 🚨 ReliefMap - Disaster Relief Platform

> **Hackathon-Ready Disaster Response Platform** - Real-time mapping, emergency alerts, and community coordination for flood disasters and emergencies.

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

### 🔐 **Authentication & Security**
- **Google OAuth**: Secure Google Sign-In integration
- **Guest Access**: Location-based anonymous access
- **Firebase Auth**: Enterprise-grade authentication
- **Data Privacy**: GDPR-compliant user data handling

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
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FCM_VAPID_KEY=your_vapid_key_here
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

### Maps & Location
- **React-Leaflet** for interactive mapping
- **Geolocation API** for automatic location detection
- **Custom markers** and popups for reports and alerts

### Development Tools
- **ESLint** for code quality
- **Prettier** for code formatting
- **TypeScript** for type checking
- **Vite plugins** for optimization

## 📁 **Project Structure**

```
src/
├── components/           # UI Components
│   ├── DesktopOnly.tsx   # Desktop-only detection
│   ├── NotificationDemo.tsx # Notification testing
│   ├── FloodAwarenessPage.tsx # Educational content
│   ├── WelcomeSummaryPage.tsx # Onboarding summary
│   ├── Map/              # Mapping components
│   ├── Alerts/           # Alert system
│   └── UI/               # Reusable UI components
├── contexts/             # Global state management
│   └── AppContext.tsx    # Main app state
├── utils/                # Utility functions
│   └── notifications.ts  # Notification system
├── types/                # TypeScript definitions
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
- **Professional UI/UX** with custom design
- **Firebase integration** for real-time data
- **Desktop optimization** for focused user experience

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
- **Firebase** for backend infrastructure
- **Open-source community** for amazing tools and libraries

---

## 🎉 **Ready for Hackathon Success!**

This platform demonstrates:
- ✅ **Real-world problem solving** for disaster response
- ✅ **Modern web technologies** and best practices
- ✅ **User-centered design** with accessibility
- ✅ **Scalable architecture** for production deployment
- ✅ **Community impact** through functional features

**Built with ❤️ for communities in crisis.** 🚨🆘

---

*Developed for disaster relief and emergency response coordination.*
