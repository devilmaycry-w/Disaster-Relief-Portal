import React from 'react';
import { Plus, Zap } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const FloatingActionButton: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const [isPressed, setIsPressed] = React.useState(false);

  const handleClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    dispatch({ type: 'TOGGLE_REPORT_MODAL', payload: true });
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 md:bottom-24 md:right-8">
      {/* Ripple effect background */}
      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
      
      <button
        onClick={handleClick}
        className={`
          relative bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
          text-white p-4 rounded-full shadow-xl hover:shadow-2xl 
          transition-all duration-300 transform hover:scale-110 active:scale-95
          border-2 border-white/20 backdrop-blur-md
          ${isPressed ? 'scale-95' : ''}
          ${state.isSubmitting ? 'animate-pulse-subtle' : ''}
        `}
        aria-label="Submit new report"
        disabled={state.isSubmitting}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full blur-md opacity-50 -z-10"></div>
        
        {state.isSubmitting ? (
          <div className="animate-spin">
            <Zap size={24} />
          </div>
        ) : (
          <Plus size={24} className="drop-shadow-sm" />
        )}
        
        {/* Subtle inner shadow for depth */}
        <div className="absolute inset-1 rounded-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
        Submit Report
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};

export default FloatingActionButton;