// UI state interface
export interface UIState {
  submittingForm: boolean;
  submitError: string | null;
}

// UI actions
export type UIAction =
  | { type: "UI_SET_SUBMITTING"; payload: boolean }
  | { type: "UI_SET_SUBMIT_ERROR"; payload: string | null }
  | { type: "UI_CLEAR_ERRORS" }
  | { type: "UI_RESET" };

// Initial state
export const initialUIState: UIState = {
  submittingForm: false,
  submitError: null,
};

// UI reducer
export const uiReducer = (
  state: UIState,
  action: UIAction
): UIState => {
  switch (action.type) {
    case "UI_SET_SUBMITTING":
      return {
        ...state,
        submittingForm: action.payload,
      };

    case "UI_SET_SUBMIT_ERROR":
      return {
        ...state,
        submitError: action.payload,
      };

    case "UI_CLEAR_ERRORS":
      return {
        ...state,
        submitError: null,
      };

    case "UI_RESET":
      return initialUIState;

    default:
      return state;
  }
};
