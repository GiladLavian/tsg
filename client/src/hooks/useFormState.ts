import { useReducer, useCallback } from 'react';
import { FormState, FormAction, FormField } from '../types/form.types';
import { validateField } from '../utils/validation.utils';

/**
 * Initial state for form reducer
 */
const initialFormState: FormState = {
  data: {},
  errors: {},
  isSubmitting: false,
  isValid: false,
};

/**
 * Form reducer to manage form state
 */
const formReducer = (state: FormState, action: FormAction): FormState => {
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

/**
 * Custom hook for managing form state with validation
 */
export const useFormState = (formFields: FormField[]) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  /**
   * Set field value and clear any existing errors for that field
   */
  const setFieldValue = useCallback((field: string, value: any) => {
    dispatch({ type: 'SET_FIELD_VALUE', payload: { field, value } });
    dispatch({ type: 'CLEAR_FIELD_ERROR', payload: { field } });
  }, []);

  /**
   * Set field error
   */
  const setFieldError = useCallback((field: string, error: string) => {
    dispatch({ type: 'SET_FIELD_ERROR', payload: { field, error } });
  }, []);

  /**
   * Clear field error
   */
  const clearFieldError = useCallback((field: string) => {
    dispatch({ type: 'CLEAR_FIELD_ERROR', payload: { field } });
  }, []);

  /**
   * Validate a specific field
   */
  const validateSingleField = useCallback((fieldName: string, value: any) => {
    const fieldConfig = formFields.find(field => field.name === fieldName);
    if (!fieldConfig) return;

    const error = validateField(fieldConfig, value);
    if (error) {
      setFieldError(fieldName, error);
    } else {
      clearFieldError(fieldName);
    }
  }, [formFields, setFieldError, clearFieldError]);

  /**
   * Validate all form fields
   */
  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};
    let isValid = true;

    formFields.forEach(field => {
      const value = state.data[field.name];
      const error = validateField(field, value);
      if (error) {
        errors[field.name] = error;
        isValid = false;
      }
    });

    dispatch({ type: 'SET_VALIDATION_ERRORS', payload: errors });
    return isValid;
  }, [formFields, state.data]);

  /**
   * Set submitting state
   */
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    dispatch({ type: 'SET_SUBMITTING', payload: isSubmitting });
  }, []);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    dispatch({ type: 'RESET_FORM' });
  }, []);

  /**
   * Set multiple form values at once
   */
  const setFormData = useCallback((data: Record<string, any>) => {
    dispatch({ type: 'SET_FORM_DATA', payload: data });
  }, []);

  return {
    formState: state,
    setFieldValue,
    setFieldError,
    clearFieldError,
    validateSingleField,
    validateForm,
    setSubmitting,
    resetForm,
    setFormData,
  };
};
