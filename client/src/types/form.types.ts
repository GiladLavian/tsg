export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'date' | 'number' | 'dropdown';
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[];
  placeholder?: string;
  validation?: {
    pattern?: string;
    message?: string;
  };
}

export interface FormSchema {
  id?: string;
  name: string;
  description?: string;
  fields: FormField[];
}

export interface FormSubmission {
  id?: string;
  data: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface FormErrors {
  [fieldName: string]: string;
}

export interface FormState {
  data: Record<string, any>;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

export type FormAction = 
  | { type: 'SET_FIELD_VALUE'; payload: { field: string; value: any } }
  | { type: 'SET_FIELD_ERROR'; payload: { field: string; error: string } }
  | { type: 'CLEAR_FIELD_ERROR'; payload: { field: string } }
  | { type: 'SET_SUBMITTING'; payload: boolean }
  | { type: 'RESET_FORM' }
  | { type: 'SET_FORM_DATA'; payload: Record<string, any> }
  | { type: 'SET_VALIDATION_ERRORS'; payload: FormErrors };

export interface ValidationError {
  field: string;
  message: string;
}
