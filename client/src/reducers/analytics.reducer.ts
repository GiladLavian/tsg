import { AnalyticsData } from '../types/analytics.types';

// Analytics state interface
export interface AnalyticsState {
  data: AnalyticsData | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Analytics actions
export type AnalyticsAction =
  | { type: "ANALYTICS_SET_LOADING"; payload: boolean }
  | { type: "ANALYTICS_SET_ERROR"; payload: string | null }
  | { type: "ANALYTICS_SET_DATA"; payload: AnalyticsData }
  | { type: "ANALYTICS_CLEAR_ERROR" }
  | { type: "ANALYTICS_RESET" };

// Initial state
export const initialAnalyticsState: AnalyticsState = {
  data: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

// Analytics reducer
export const analyticsReducer = (
  state: AnalyticsState,
  action: AnalyticsAction
): AnalyticsState => {
  switch (action.type) {
    case "ANALYTICS_SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "ANALYTICS_SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "ANALYTICS_SET_DATA":
      return {
        ...state,
        data: action.payload,
        lastUpdated: new Date(),
      };

    case "ANALYTICS_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "ANALYTICS_RESET":
      return initialAnalyticsState;

    default:
      return state;
  }
};
