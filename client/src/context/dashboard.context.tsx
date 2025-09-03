import React, {
  createContext,
  ReactNode,
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

  // Create completely stable action references with no dependencies
  const actions = useMemo(
    () => ({
      fetchSubmissions: () => {
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
      },
      fetchSchema: (name: string) => {
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
      },
      fetchAnalytics: () => {
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
      },
      submitForm: async (data: Record<string, any>) => {
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
      },
      clearErrors: () => {
        dispatch({ type: "SUBMISSIONS_CLEAR_ERROR" });
        dispatch({ type: "ANALYTICS_CLEAR_ERROR" });
        dispatch({ type: "SCHEMA_CLEAR_ERROR" });
        dispatch({ type: "UI_CLEAR_ERRORS" });
      },
      resetDashboard: () => {
        dispatch({ type: "RESET_DASHBOARD" });
      },
    }),
    [] // No dependencies at all
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
