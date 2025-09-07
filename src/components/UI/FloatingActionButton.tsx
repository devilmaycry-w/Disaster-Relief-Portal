import React from 'react';
import { Plus } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';

const FloatingActionButton: React.FC = () => {
  const { dispatch } = useAppContext();

  const handleClick = () => {
    dispatch({ type: 'TOGGLE_REPORT_MODAL', payload: true });
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 md:bottom-24 md:right-8"
      aria-label="Add new report"
    >
      <Plus size={24} />
    </button>
  );
};

export default FloatingActionButton;