import { FormSubmission } from '../types/form.types';

// Submissions state interface
export interface SubmissionsState {
  submissions: FormSubmission[];
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

// Submissions actions
export type SubmissionsAction =
  | { type: "SUBMISSIONS_SET_LOADING"; payload: boolean }
  | { type: "SUBMISSIONS_SET_ERROR"; payload: string | null }
  | { type: "SUBMISSIONS_SET_DATA"; payload: FormSubmission[] }
  | { type: "SUBMISSIONS_ADD_ITEM"; payload: FormSubmission }
  | { type: "SUBMISSIONS_CLEAR_ERROR" }
  | { type: "SUBMISSIONS_RESET" };

// Initial state
export const initialSubmissionsState: SubmissionsState = {
  submissions: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Submissions reducer
export const submissionsReducer = (
  state: SubmissionsState,
  action: SubmissionsAction
): SubmissionsState => {
  switch (action.type) {
    case "SUBMISSIONS_SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SUBMISSIONS_SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SUBMISSIONS_SET_DATA":
      return {
        ...state,
        submissions: action.payload,
        lastUpdated: new Date(),
      };

    case "SUBMISSIONS_ADD_ITEM":
      return {
        ...state,
        submissions: [action.payload, ...state.submissions],
        lastUpdated: new Date(),
      };

    case "SUBMISSIONS_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SUBMISSIONS_RESET":
      return initialSubmissionsState;

    default:
      return state;
  }
};
