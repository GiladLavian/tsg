import { AnalyticsData } from '../types/analytics.types';
import { FormSchema, FormSubmission } from '../types/form.types';

// Dashboard state interface
export interface DashboardState {
  submissions: FormSubmission[];
  currentSchema: FormSchema | null;
  analytics: AnalyticsData | null;
  loading: {
    submissions: boolean;
    schema: boolean;
    analytics: boolean;
    submitting: boolean;
  };
  error: {
    submissions: string | null;
    schema: string | null;
    analytics: string | null;
    submit: string | null;
  };
  lastUpdated: {
    submissions: Date | null;
    analytics: Date | null;
  };
}

// Dashboard actions
export type DashboardAction =
  | {
      type: "SET_LOADING";
      payload: { key: keyof DashboardState["loading"]; value: boolean };
    }
  | {
      type: "SET_ERROR";
      payload: { key: keyof DashboardState["error"]; value: string | null };
    }
  | { type: "SET_SUBMISSIONS"; payload: FormSubmission[] }
  | { type: "ADD_SUBMISSION"; payload: FormSubmission }
  | { type: "SET_SCHEMA"; payload: FormSchema | null }
  | { type: "SET_ANALYTICS"; payload: AnalyticsData }
  | { type: "CLEAR_ERRORS" }
  | { type: "RESET_DASHBOARD" };

// Initial state
export const initialDashboardState: DashboardState = {
  submissions: [],
  currentSchema: null,
  analytics: null,
  loading: {
    submissions: false,
    schema: false,
    analytics: false,
    submitting: false,
  },
  error: {
    submissions: null,
    schema: null,
    analytics: null,
    submit: null,
  },
  lastUpdated: {
    submissions: null,
    analytics: null,
  },
};

// Dashboard reducer
export const dashboardReducer = (
  state: DashboardState,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };

    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.key]: action.payload.value,
        },
      };

    case "SET_SUBMISSIONS":
      return {
        ...state,
        submissions: action.payload,
        lastUpdated: {
          ...state.lastUpdated,
          submissions: new Date(),
        },
      };

    case "ADD_SUBMISSION":
      return {
        ...state,
        submissions: [action.payload, ...state.submissions],
        lastUpdated: {
          ...state.lastUpdated,
          submissions: new Date(),
        },
      };

    case "SET_SCHEMA":
      return {
        ...state,
        currentSchema: action.payload,
      };

    case "SET_ANALYTICS":
      return {
        ...state,
        analytics: action.payload,
        lastUpdated: {
          ...state.lastUpdated,
          analytics: new Date(),
        },
      };

    case "CLEAR_ERRORS":
      return {
        ...state,
        error: {
          submissions: null,
          schema: null,
          analytics: null,
          submit: null,
        },
      };

    case "RESET_DASHBOARD":
      return initialDashboardState;

    default:
      return state;
  }
};
