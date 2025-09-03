import { 
  SubmissionsState, 
  SubmissionsAction, 
  submissionsReducer, 
  initialSubmissionsState 
} from './submissions.reducer';
import { 
  AnalyticsState, 
  AnalyticsAction, 
  analyticsReducer, 
  initialAnalyticsState 
} from './analytics.reducer';
import { 
  SchemaState, 
  SchemaAction, 
  schemaReducer, 
  initialSchemaState 
} from './schema.reducer';
import { 
  UIState, 
  UIAction, 
  uiReducer, 
  initialUIState 
} from './ui.reducer';

// Combined dashboard state
export interface DashboardState {
  submissions: SubmissionsState;
  analytics: AnalyticsState;
  schema: SchemaState;
  ui: UIState;
}

// Combined dashboard actions
export type DashboardAction = 
  | SubmissionsAction 
  | AnalyticsAction 
  | SchemaAction 
  | UIAction
  | { type: "RESET_DASHBOARD" };

// Initial combined state
export const initialDashboardState: DashboardState = {
  submissions: initialSubmissionsState,
  analytics: initialAnalyticsState,
  schema: initialSchemaState,
  ui: initialUIState,
};

// Combined dashboard reducer
export const dashboardReducer = (
  state: DashboardState,
  action: DashboardAction
): DashboardState => {
  switch (action.type) {
    case "RESET_DASHBOARD":
      return initialDashboardState;

    // Submissions actions
    case "SUBMISSIONS_SET_LOADING":
    case "SUBMISSIONS_SET_ERROR":
    case "SUBMISSIONS_SET_DATA":
    case "SUBMISSIONS_ADD_ITEM":
    case "SUBMISSIONS_CLEAR_ERROR":
    case "SUBMISSIONS_RESET":
      return {
        ...state,
        submissions: submissionsReducer(state.submissions, action as SubmissionsAction),
      };

    // Analytics actions
    case "ANALYTICS_SET_LOADING":
    case "ANALYTICS_SET_ERROR":
    case "ANALYTICS_SET_DATA":
    case "ANALYTICS_CLEAR_ERROR":
    case "ANALYTICS_RESET":
      return {
        ...state,
        analytics: analyticsReducer(state.analytics, action as AnalyticsAction),
      };

    // Schema actions
    case "SCHEMA_SET_LOADING":
    case "SCHEMA_SET_ERROR":
    case "SCHEMA_SET_DATA":
    case "SCHEMA_CLEAR_ERROR":
    case "SCHEMA_RESET":
      return {
        ...state,
        schema: schemaReducer(state.schema, action as SchemaAction),
      };

    // UI actions
    case "UI_SET_SUBMITTING":
    case "UI_SET_SUBMIT_ERROR":
    case "UI_CLEAR_ERRORS":
    case "UI_RESET":
      return {
        ...state,
        ui: uiReducer(state.ui, action as UIAction),
      };

    default:
      return state;
  }
};

// Export all types and reducers for convenience
export * from './submissions.reducer';
export * from './analytics.reducer';
export * from './schema.reducer';
export * from './ui.reducer';
