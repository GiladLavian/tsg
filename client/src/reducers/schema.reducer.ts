import { FormSchema } from '../types/form.types';

// Schema state interface
export interface SchemaState {
  currentSchema: FormSchema | null;
  loading: boolean;
  error: string | null;
}

// Schema actions
export type SchemaAction =
  | { type: "SCHEMA_SET_LOADING"; payload: boolean }
  | { type: "SCHEMA_SET_ERROR"; payload: string | null }
  | { type: "SCHEMA_SET_DATA"; payload: FormSchema | null }
  | { type: "SCHEMA_CLEAR_ERROR" }
  | { type: "SCHEMA_RESET" };

// Initial state
export const initialSchemaState: SchemaState = {
  currentSchema: null,
  loading: false,
  error: null,
};

// Schema reducer
export const schemaReducer = (
  state: SchemaState,
  action: SchemaAction
): SchemaState => {
  switch (action.type) {
    case "SCHEMA_SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SCHEMA_SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "SCHEMA_SET_DATA":
      return {
        ...state,
        currentSchema: action.payload,
      };

    case "SCHEMA_CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };

    case "SCHEMA_RESET":
      return initialSchemaState;

    default:
      return state;
  }
};
