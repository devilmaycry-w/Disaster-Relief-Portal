import React from 'react';
import { AppProvider, useAppContext } from './contexts/AppContext';
import Header from './components/Layout/Header';
import FilterBar from './components/Map/FilterBar';
import ReliefMap from './components/Map/MapContainer';
import ReportModal from './components/Forms/ReportModal';
import ReportDetails from './components/Reports/ReportDetails';
import AlertsModal from './components/Alerts/AlertsModal';
import FloatingActionButton from './components/UI/FloatingActionButton';
import SplashScreen from './components/SplashScreen';
import BottomNav from './components/UI/BottomNav';
import AlertsPage from './components/AlertsPage';
import ProfilePage from './components/ProfilePage';



import DirectionsTab from './components/Map/DirectionsTab';

function AppInner() {
  const { state, dispatch } = useAppContext();
  const [showSplash, setShowSplash] = React.useState(() => {
    return !localStorage.getItem('reliefmap_splash_seen');
  });

  const handleSplashContinue = () => {
    localStorage.setItem('reliefmap_splash_seen', '1');
    setShowSplash(false);
  };

  const renderRoute = () => {
    if (state.route === 'home') return (
      <>
        <FilterBar />
        <div className="flex-1 relative">
          <ReliefMap />
          <FloatingActionButton />
        </div>
        <DirectionsTab />
      </>
    );
    if (state.route === 'alerts') return <AlertsPage />;
    if (state.route === 'profile') return <ProfilePage />;
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <Header />
      {showSplash ? (
        <SplashScreen onContinue={handleSplashContinue} />
      ) : (
        <div className="flex-1 flex flex-col animate-fadeIn">
          {renderRoute()}
        </div>
      )}
      <BottomNav active={state.route} onChange={(r) => dispatch({ type: 'SET_ROUTE', payload: r })} />
      {/* Modals */}
      <ReportModal />
      <ReportDetails />
      <AlertsModal />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default App;