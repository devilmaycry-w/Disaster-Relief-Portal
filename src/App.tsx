import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Header from './components/Layout/Header';
import FilterBar from './components/Map/FilterBar';
import ReliefMap from './components/Map/MapContainer';
import ReportModal from './components/Forms/ReportModal';
import ReportDetails from './components/Reports/ReportDetails';
import AlertsModal from './components/Alerts/AlertsModal';
import SplashScreen from './components/SplashScreen';
import BottomNav from './components/UI/BottomNav';
import OnboardingModal from './components/UI/OnboardingModal';
import FloodAwarenessPage from './components/FloodAwarenessPage';
import AlertsPage from './components/AlertsPage';
import ProfilePage from './components/ProfilePage';
import WelcomeSummaryPage from './components/WelcomeSummaryPage';
import DeviceTest from './components/DeviceTest';
import NotificationDemo from './components/NotificationDemo';

function AppInner() {
  const { state, dispatch } = useAppContext();
  const [showSplash, setShowSplash] = React.useState(() => {
    return !localStorage.getItem('reliefmap_splash_seen');
  });
  const [showOnboarding, setShowOnboarding] = React.useState(() => {
    return !localStorage.getItem('reliefmap_onboarding_seen');
  });
  const [showWelcomeSummary, setShowWelcomeSummary] = React.useState(() => {
    return !localStorage.getItem('reliefmap_welcome_summary_seen');
  });
  const [showFloodAwareness, setShowFloodAwareness] = React.useState(() => {
    return !localStorage.getItem('reliefmap_flood_awareness_seen');
  });

  React.useEffect(() => {
    if (!state.userLocation && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: 'SET_USER_LOCATION',
            payload: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        },
        () => {
          // If denied, do nothing (app will not work without location)
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  }, [dispatch, state.userLocation]);

  const handleSplashContinue = () => {
    localStorage.setItem('reliefmap_splash_seen', '1');
    setShowSplash(false);
    if (!localStorage.getItem('reliefmap_onboarding_seen')) {
      setShowOnboarding(true);
    }
  };

  const handleOnboardingClose = () => {
    localStorage.setItem('reliefmap_onboarding_seen', '1');
    setShowOnboarding(false);
  };

  const handleWelcomeSummaryContinue = () => {
    localStorage.setItem('reliefmap_welcome_summary_seen', '1');
    setShowWelcomeSummary(false);
  };

  const handleFloodAwarenessContinue = () => {
    localStorage.setItem('reliefmap_flood_awareness_seen', '1');
    setShowFloodAwareness(false);
  };

  const renderRoute = () => {
    if (state.route === 'home') return (
      <>
        <FilterBar />
        <div className="flex-1 relative">
          <ReliefMap />
        </div>
      </>
    );
    if (state.route === 'alerts') return <AlertsPage />;
    if (state.route === 'profile') return <ProfilePage />;
    if (state.route === 'test') return <DeviceTest />;
    if (state.route === 'notifications') return (
      <div className="p-6 max-w-2xl mx-auto">
        <NotificationDemo />
      </div>
    );
  };  if (!state.userLocation) {
    return <SplashScreen onContinue={handleSplashContinue} />;
  }

  if (showWelcomeSummary) {
    return <WelcomeSummaryPage onContinue={handleWelcomeSummaryContinue} />;
  }

  if (showFloodAwareness) {
    return <FloodAwarenessPage onContinue={handleFloodAwarenessContinue} />;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      {showSplash ? (
        <SplashScreen onContinue={handleSplashContinue} />
      ) : (
        <div className="flex-1 flex flex-col animate-fadeIn pb-24 md:pb-0">
          {renderRoute()}
        </div>
      )}
      <BottomNav active={state.route} onChange={(r) => dispatch({ type: 'SET_ROUTE', payload: r })} />
      {/* Modals */}
      <ReportModal />
      <ReportDetails />
      <AlertsModal />
      <OnboardingModal open={showOnboarding} onClose={handleOnboardingClose} />
    </div>
  );
}


function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppInner />
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;