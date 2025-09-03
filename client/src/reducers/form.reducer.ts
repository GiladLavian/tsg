import { FormState, FormAction } from '../types/form.types';

/**
 * Initial state for form reducer
 */
export const initialFormState: FormState = {
  data: {},
  errors: {},
  isSubmitting: false,
  isValid: false,
};

/**
 * Form reducer to manage form state
 */
export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      const newData = {
        ...state.data,
        [action.payload.field]: action.payload.value,
      };
      return {
        ...state,
        data: newData,
      };

    case 'SET_FIELD_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };

    case 'CLEAR_FIELD_ERROR':
      const newErrors = { ...state.errors };
      delete newErrors[action.payload.field];
      return {
        ...state,
        errors: newErrors,
      };

    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };

    case 'RESET_FORM':
      return initialFormState;

    case 'SET_FORM_DATA':
      return {
        ...state,
        data: action.payload,
      };

    case 'SET_VALIDATION_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };

    default:
      return state;
  }
};
