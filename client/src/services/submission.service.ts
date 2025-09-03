import { BaseHttpService, ApiResponse } from './http.service';

/**
 * Form submission and schema management service
 * Handles all form-related operations including submissions and schema management
 */
export class SubmissionService extends BaseHttpService {
  /**
   * Submit form data
   */
  async submitForm(data: Record<string, any>): Promise<ApiResponse<FormSubmission>> {
    return this.post<FormSubmission>('/forms/submit', { data });
  }

  /**
   * Get all form submissions
   */
  async getSubmissions(): Promise<ApiResponse<FormSubmission[]>> {
    return this.get<FormSubmission[]>('/forms/submissions');
  }

  /**
   * Get a specific form submission by ID
   */
  async getSubmissionById(id: string): Promise<ApiResponse<FormSubmission>> {
    return this.get<FormSubmission>(`/forms/submissions/${id}`);
  }

  /**
   * Create or update a form schema
   */
  async saveFormSchema(schema: FormSchema): Promise<ApiResponse<FormSchema>> {
    return this.post<FormSchema>('/forms/schema', schema);
  }

  /**
   * Get a form schema by name
   */
  async getFormSchema(name: string): Promise<ApiResponse<FormSchema>> {
    return this.get<FormSchema>(`/forms/schema/${name}`);
  }

  /**
   * Get all form schemas
   */
  async getFormSchemas(): Promise<ApiResponse<FormSchema[]>> {
    return this.get<FormSchema[]>('/forms/schemas');
  }

  /**
   * Validate form data against a schema
   */
  async validateFormData(schemaName: string, data: Record<string, any>): Promise<ApiResponse> {
    return this.post('/forms/validate', { schemaName, data });
  }
}

/**
 * Form field interface - matches existing types
 */
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

/**
 * Form schema interface - matches existing types
 */
export interface FormSchema {
  id?: string;
  name: string;
  description?: string;
  fields: FormField[];
}

/**
 * Form submission interface - matches existing types
 */
export interface FormSubmission {
  id?: string;
  data: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

// Export singleton instance
export const submissionService = new SubmissionService();
export default submissionService;
