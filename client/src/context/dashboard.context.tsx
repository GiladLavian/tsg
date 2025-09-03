import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import {
  dashboardReducer,
  DashboardState,
  initialDashboardState,
} from "../reducers";
import { analyticsService, submissionService } from "../services";

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
  const [state, dispatch] = useReducer(dashboardReducer, initialDashboardState);

  /**
   * Fetches all form submissions from the API
   * Sets loading state during the request and handles errors appropriately
   * @returns Promise that resolves when submissions are loaded
   */
  const fetchSubmissions = useCallback(() => {
    dispatch({ type: "SUBMISSIONS_SET_LOADING", payload: true });
    dispatch({ type: "SUBMISSIONS_SET_ERROR", payload: null });
    
    return submissionService.getSubmissions()
      .then(response => {
        if (response.success && response.data) {
          dispatch({ type: "SUBMISSIONS_SET_DATA", payload: response.data });
        } else {
          throw new Error(response.message || "Failed to fetch submissions");
        }
      })
      .catch((error: any) => {
        dispatch({ type: "SUBMISSIONS_SET_ERROR", payload: error.message });
      })
      .finally(() => {
        dispatch({ type: "SUBMISSIONS_SET_LOADING", payload: false });
      });
  }, []);

  /**
   * Fetches a specific form schema by name
   * Used to get the structure and validation rules for dynamic forms
   * @param name - The name/identifier of the form schema to fetch
   * @returns Promise that resolves when schema is loaded
   */
  const fetchSchema = useCallback((name: string) => {
    dispatch({ type: "SCHEMA_SET_LOADING", payload: true });
    dispatch({ type: "SCHEMA_SET_ERROR", payload: null });

    return submissionService.getFormSchema(name)
      .then(response => {
        if (response.success && response.data) {
          dispatch({ type: "SCHEMA_SET_DATA", payload: response.data });
        } else {
          throw new Error(response.message || "Failed to fetch schema");
        }
      })
      .catch((error: any) => {
        dispatch({ type: "SCHEMA_SET_ERROR", payload: error.message });
      })
      .finally(() => {
        dispatch({ type: "SCHEMA_SET_LOADING", payload: false });
      });
  }, []);

  /**
   * Fetches analytics data including submission statistics and metrics
   * Loads data for charts, graphs, and dashboard analytics views
   * @returns Promise that resolves when analytics data is loaded
   */
  const fetchAnalytics = useCallback(() => {
    dispatch({ type: "ANALYTICS_SET_LOADING", payload: true });
    dispatch({ type: "ANALYTICS_SET_ERROR", payload: null });
    
    return analyticsService.getAnalytics()
      .then(response => {
        if (response.success && response.data) {
          dispatch({ type: "ANALYTICS_SET_DATA", payload: response.data });
        } else {
          throw new Error(response.message || "Failed to fetch analytics");
        }
      })
      .catch((error: any) => {
        dispatch({ type: "ANALYTICS_SET_ERROR", payload: error.message });
      })
      .finally(() => {
        dispatch({ type: "ANALYTICS_SET_LOADING", payload: false });
      });
  }, []);

  /**
   * Submits form data to the server and updates the submissions list
   * Handles form submission with loading states and error handling
   * @param data - The form data to submit as key-value pairs
   * @returns Promise that resolves when form is successfully submitted
   * @throws Error if submission fails
   */
  const submitForm = useCallback(async (data: Record<string, any>) => {
    dispatch({ type: "UI_SET_SUBMITTING", payload: true });
    dispatch({ type: "UI_SET_SUBMIT_ERROR", payload: null });

    try {
      const response = await submissionService.submitForm(data);
      if (response.success && response.data) {
        dispatch({ type: "SUBMISSIONS_ADD_ITEM", payload: response.data });
      } else {
        throw new Error(response.message || "Failed to submit form");
      }
    } catch (error: any) {
      dispatch({ type: "UI_SET_SUBMIT_ERROR", payload: error.message });
      throw error;
    } finally {
      dispatch({ type: "UI_SET_SUBMITTING", payload: false });
    }
  }, []);

  /**
   * Clears all error messages across different dashboard sections
   * Resets error states for submissions, analytics, schema, and UI
   */
  const clearErrors = useCallback(() => {
    dispatch({ type: "SUBMISSIONS_CLEAR_ERROR" });
    dispatch({ type: "ANALYTICS_CLEAR_ERROR" });
    dispatch({ type: "SCHEMA_CLEAR_ERROR" });
    dispatch({ type: "UI_CLEAR_ERRORS" });
  }, []);

  /**
   * Resets the entire dashboard state to initial values
   * Clears all data, loading states, and errors across all sections
   */
  const resetDashboard = useCallback(() => {
    dispatch({ type: "RESET_DASHBOARD" });
  }, []);

  // Create actions object with stable references
  const actions = useMemo(
    () => ({
      fetchSubmissions,
      fetchSchema,
      fetchAnalytics,
      submitForm,
      clearErrors,
      resetDashboard,
    }),
    [fetchSubmissions, fetchSchema, fetchAnalytics, submitForm, clearErrors, resetDashboard]
  );

  const contextValue: DashboardContextType = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
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
