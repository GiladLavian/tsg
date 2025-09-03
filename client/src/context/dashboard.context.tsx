import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { apiService } from "../services/api.service";
import { AnalyticsData } from "../types/analytics.types";
import { FormSchema, FormSubmission } from "../types/form.types";

// Dashboard state interface
interface DashboardState {
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
type DashboardAction =
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
const initialState: DashboardState = {
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
const dashboardReducer = (
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
      return initialState;

    default:
      return state;
  }
};

// Context interface
interface DashboardContextType {
  state: DashboardState;
  actions: {
    fetchSubmissions: () => Promise<void>;
    fetchSchema: (name: string) => Promise<void>;
    fetchAnalytics: () => Promise<void>;
    submitForm: (data: Record<string, any>) => Promise<void>;
    clearErrors: () => void;
    resetDashboard: () => void;
  };
}

// Create context
const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

// Context provider component
interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  // Fetch all submissions
  const fetchSubmissions = useCallback(async () => {
    dispatch({
      type: "SET_LOADING",
      payload: { key: "submissions", value: true },
    });
    dispatch({
      type: "SET_ERROR",
      payload: { key: "submissions", value: null },
    });

    try {
      const response = await apiService.getSubmissions();
      if (response.success && response.data) {
        dispatch({ type: "SET_SUBMISSIONS", payload: response.data });
      } else {
        throw new Error(response.message || "Failed to fetch submissions");
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: { key: "submissions", value: error.message },
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "submissions", value: false },
      });
    }
  }, []);

  // Fetch form schema
  const fetchSchema = useCallback(async (name: string) => {
    dispatch({ type: "SET_LOADING", payload: { key: "schema", value: true } });
    dispatch({ type: "SET_ERROR", payload: { key: "schema", value: null } });

    try {
      const response = await apiService.getFormSchema(name);
      if (response.success && response.data) {
        dispatch({ type: "SET_SCHEMA", payload: response.data });
      } else {
        throw new Error(response.message || "Failed to fetch schema");
      }
    } catch (error: any) {
      dispatch({
        type: "SET_ERROR",
        payload: { key: "schema", value: error.message },
      });
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "schema", value: false },
      });
    }
  }, []);

  // Fetch analytics data
  const fetchAnalytics = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: { key: 'analytics', value: true } });
    dispatch({ type: 'SET_ERROR', payload: { key: 'analytics', value: null } });
    try {
      const response = await apiService.getAnalytics();
      if (response.success && response.data) {
        dispatch({ type: 'SET_ANALYTICS', payload: response.data });
      } else {
        throw new Error(response.message || 'Failed to fetch analytics');
      }
    } catch (error: any) {
      dispatch({ type: 'SET_ERROR', payload: { key: 'analytics', value: error.message } });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: { key: 'analytics', value: false } });
    }
  }, []);

  // Submit form data
  const submitForm = useCallback(
    async (data: Record<string, any>) => {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "submitting", value: true },
      });
      dispatch({ type: "SET_ERROR", payload: { key: "submit", value: null } });

      try {
        const response = await apiService.submitForm(data);
        if (response.success && response.data) {
          dispatch({ type: "ADD_SUBMISSION", payload: response.data });
          // Refresh analytics after new submission
          fetchAnalytics();
        } else {
          throw new Error(response.message || "Failed to submit form");
        }
      } catch (error: any) {
        dispatch({
          type: "SET_ERROR",
          payload: { key: "submit", value: error.message },
        });
        throw error; // Re-throw to allow form to handle it
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "submitting", value: false },
        });
      }
    },
    [fetchAnalytics]
  );

  // Clear all errors
  const clearErrors = useCallback(() => {
    dispatch({ type: "CLEAR_ERRORS" });
  }, []);

  // Reset dashboard state
  const resetDashboard = useCallback(() => {
    dispatch({ type: "RESET_DASHBOARD" });
  }, []);

  const contextValue: DashboardContextType = useMemo(
    () => ({
      state,
      actions: {
        fetchSubmissions,
        fetchSchema,
        fetchAnalytics,
        submitForm,
        clearErrors,
        resetDashboard,
      },
    }),
    [
      state,
      fetchSubmissions,
      fetchSchema,
      fetchAnalytics,
      submitForm,
      clearErrors,
      resetDashboard,
    ]
  );

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

// Custom hook to use dashboard context
export const useDashboard = (): DashboardContextType => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
