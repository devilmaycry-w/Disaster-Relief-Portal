import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface MobileSearchModalProps {
  open: boolean;
  onClose: () => void;
  onSearch: (query: string) => void;
  loading?: boolean;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({ open, onClose, onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/30 backdrop-blur-lg animate-fadeIn"
      onClick={onClose}
      style={{ cursor: 'pointer' }}
    >
      <div
        className="w-full max-w-md mx-auto mt-16 bg-white rounded-2xl shadow-2xl p-4 relative animate-slideUp"
        onClick={e => e.stopPropagation()}
        style={{ cursor: 'auto' }}
      >
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <Search size={22} className="text-blue-500" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Enter the destination"
            className="flex-1 bg-transparent outline-none text-lg font-semibold text-black placeholder-gray-400"
            autoFocus
          />
          <button
            type="submit"
            className="text-blue-600 font-bold px-4 py-2 rounded-xl hover:bg-blue-50 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div> : 'Go'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MobileSearchModal;
