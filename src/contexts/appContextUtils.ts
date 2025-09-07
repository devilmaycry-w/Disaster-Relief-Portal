import { Report, Alert, FilterType, User } from '../types';

export interface AppState {
  reports: Report[];
  alerts: Alert[];
  activeFilters: FilterType[];
  selectedReport: Report | null;
  user: User | null;
  unreadAlerts: Set<string>;
  userLocation: { lat: number; lng: number } | null;
  mapCenter: { lat: number; lng: number } | null;
  route: 'home' | 'alerts' | 'profile';
  isLoading: boolean;
  isSubmitting: boolean;
  showReportModal: boolean;
  showAlertsModal: boolean;
}

export type AppAction =
  | { type: 'SET_REPORTS'; payload: Report[] }
  | { type: 'ADD_REPORT'; payload: Report }
  | { type: 'UPDATE_REPORT'; payload: Report }
  | { type: 'SET_ALERTS'; payload: Alert[] }
  | { type: 'SET_FILTERS'; payload: FilterType[] }
  | { type: 'SET_SELECTED_REPORT'; payload: Report | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_USER_LOCATION'; payload: { lat: number; lng: number } | null }
  | { type: 'SET_MAP_CENTER'; payload: { lat: number; lng: number } | null }
  | { type: 'SET_ROUTE'; payload: 'home' | 'alerts' | 'profile' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'TOGGLE_REPORT_MODAL'; payload?: boolean }
  | { type: 'TOGGLE_ALERTS_MODAL'; payload?: boolean }
  | { type: 'MARK_ALERT_READ'; payload: string }
  | { type: 'SET_UNREAD_ALERTS'; payload: string[] };

export const initialState: AppState = {
  reports: [],
  alerts: [],
  activeFilters: ['all'],
  selectedReport: null,
  user: null,
  unreadAlerts: new Set(),
  userLocation: null,
  mapCenter: null,
  route: 'home',
  isLoading: false,
  isSubmitting: false,
  showReportModal: false,
  showAlertsModal: false,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'MARK_ALERT_READ': {
      const newSet = new Set(state.unreadAlerts);
      newSet.delete(action.payload);
      return { ...state, unreadAlerts: newSet };
    }
    case 'SET_UNREAD_ALERTS':
      return { ...state, unreadAlerts: new Set(action.payload) };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_REPORTS':
      return { ...state, reports: action.payload };
    case 'ADD_REPORT':
      return { ...state, reports: [...state.reports, action.payload] };
    case 'UPDATE_REPORT':
      return {
        ...state,
        reports: state.reports.map((r) =>
          r.id === action.payload.id ? action.payload : r
        ),
      };
    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };
    case 'SET_FILTERS':
      return { ...state, activeFilters: action.payload };
    case 'SET_SELECTED_REPORT':
      return { ...state, selectedReport: action.payload };
    case 'SET_USER_LOCATION':
      return { ...state, userLocation: action.payload };
    case 'SET_MAP_CENTER':
      return { ...state, mapCenter: action.payload };
    case 'SET_ROUTE':
      return { ...state, route: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.payload };
    case 'TOGGLE_REPORT_MODAL':
      return {
        ...state,
        showReportModal:
          action.payload !== undefined
            ? action.payload
            : !state.showReportModal,
      };
    case 'TOGGLE_ALERTS_MODAL':
      return {
        ...state,
        showAlertsModal:
          action.payload !== undefined
            ? action.payload
            : !state.showAlertsModal,
      };
    default:
      return state;
  }
}

// Type for import.meta.env
export interface ImportMetaEnv {
  VITE_FCM_VAPID_KEY?: string;
  [key: string]: any;
}
