export interface FormField {
  name: string;
  type: 'text' | 'email' | 'password' | 'date' | 'number' | 'dropdown';
  label: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: string[]; // For dropdown fields
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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ValidationError {
  field: string;
  message: string;
}
