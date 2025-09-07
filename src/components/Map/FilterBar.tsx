import React from 'react';
import { Heart, Plus, Shield, Package, Users, Filter } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext';
import { FilterType } from '../../types';

const FilterBar: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const filterOptions = [
    { 
      type: 'all' as FilterType, 
      label: 'All', 
      icon: Filter, 
      color: 'bg-gray-100 text-gray-700',
      activeColor: 'bg-gray-600 text-white'
    },
    { 
      type: 'help-needed' as FilterType, 
      label: 'Help', 
      icon: Heart, 
      color: 'bg-red-100 text-red-700',
      activeColor: 'bg-red-600 text-white'
    },
    { 
      type: 'medical' as FilterType, 
      label: 'Medical', 
      icon: Plus, 
      color: 'bg-orange-100 text-orange-700',
      activeColor: 'bg-orange-600 text-white'
    },
    { 
      type: 'safe-zone' as FilterType, 
      label: 'Safe', 
      icon: Shield, 
      color: 'bg-green-100 text-green-700',
      activeColor: 'bg-green-600 text-white'
    },
    { 
      type: 'resources' as FilterType, 
      label: 'Resources', 
      icon: Package, 
      color: 'bg-blue-100 text-blue-700',
      activeColor: 'bg-blue-600 text-white'
    },
    { 
      type: 'volunteer' as FilterType, 
      label: 'Volunteers', 
      icon: Users, 
      color: 'bg-purple-100 text-purple-700',
      activeColor: 'bg-purple-600 text-white'
    },
  ];

  const handleFilterToggle = (filterType: FilterType) => {
    let newFilters: FilterType[];
    if (filterType === 'all') {
      newFilters = ['all'];
    } else {
      const currentFilters = state.activeFilters.filter(f => f !== 'all');
      if (currentFilters.includes(filterType)) {
        newFilters = currentFilters.filter(f => f !== filterType);
        if (newFilters.length === 0) {
          newFilters = ['all'];
        }
      } else {
        newFilters = [...currentFilters, filterType];
      }
    }
    dispatch({ type: 'SET_FILTERS', payload: newFilters });

    // Center map on first report of that type
    if (filterType !== 'all') {
      const report = state.reports.find(r => r.type === filterType);
      if (report && report.location) {
        dispatch({ type: 'SET_MAP_CENTER', payload: { lat: report.location.lat, lng: report.location.lng } });
        dispatch({ type: 'SET_ROUTE', payload: 'home' });
      }
    }
  };

  const getFilterCount = (type: FilterType) => {
    if (type === 'all') return state.reports.length;
    return state.reports.filter(report => report.type === type).length;
  };

  const isActive = (type: FilterType) => {
    if (type === 'all') return state.activeFilters.includes('all');
    return state.activeFilters.includes(type) && !state.activeFilters.includes('all');
  };

  return (
    <div className="glass-strong border-b border-white/20 px-4 py-3 relative z-40 animate-fadeIn">
      {/* Mobile: Horizontal scrollable filter bar */}
      <div className="md:hidden">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-1">
          {filterOptions.map(({ type, label, icon: Icon, color, activeColor }) => (
            <button
              key={type}
              onClick={() => handleFilterToggle(type)}
              className={`
                flex-shrink-0 flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs font-semibold
                transition-all duration-300 border backdrop-blur-md interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
                ${isActive(type) 
                  ? `${activeColor} border-transparent shadow-lg transform scale-105` 
                  : `${color} border-white/20 hover:shadow-md hover:scale-102`
                }
              `}
              aria-label={`Filter by ${label}`}
              tabIndex={0}
            >
              <Icon size={16} />
              <span>{label}</span>
              <span className={`
                ml-1 px-2 py-0.5 rounded-full text-xs font-bold
                ${isActive(type) 
                  ? 'bg-white/25 backdrop-blur-sm' 
                  : 'bg-black/10 backdrop-blur-sm'
                }
              `}>
                {getFilterCount(type)}
              </span>
            </button>
          ))}
        </div>
        {/* Mobile: Active filters summary below filter bar */}
        <div className="text-xs text-gray-600 font-medium bg-white/40 px-3 py-1 rounded-full backdrop-blur-md mt-2 text-center">
          {state.activeFilters.includes('all') 
            ? `Showing all ${state.reports.length} reports`
            : `${state.reports.filter(report => 
                state.activeFilters.includes(report.type)
              ).length} of ${state.reports.length} reports`
          }
        </div>
      </div>

      {/* Desktop: Full filter bar */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold text-gray-700">Filter by type:</span>
          <div className="flex space-x-3">
            {filterOptions.map(({ type, label, icon: Icon, color, activeColor }) => (
              <button
                key={type}
                onClick={() => handleFilterToggle(type)}
                className={`
                  flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-300 border backdrop-blur-md interactive focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
                  ${isActive(type) 
                    ? `${activeColor} border-transparent shadow-lg transform scale-105` 
                    : `${color} border-white/20 hover:shadow-md hover:transform hover:scale-102`
                  }
                `}
                aria-label={`Filter by ${label}`}
                tabIndex={0}
              >
                <Icon size={18} />
                <span>{label}</span>
                <span className={`
                  ml-1 px-2.5 py-1 rounded-full text-xs font-bold
                  ${isActive(type) 
                    ? 'bg-white/25 backdrop-blur-sm' 
                    : 'bg-black/10 backdrop-blur-sm'
                  }
                `}>
                  {getFilterCount(type)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active filters summary */}
        <div className="text-sm text-gray-600 font-medium bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
          {state.activeFilters.includes('all') 
            ? `Showing all ${state.reports.length} reports`
            : `${state.reports.filter(report => 
                state.activeFilters.includes(report.type)
              ).length} of ${state.reports.length} reports`
          }
        </div>
      </div>
    </div>
  );
};

export default FilterBar;