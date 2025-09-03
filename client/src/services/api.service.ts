import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ApiResponse, RequestConfig } from '../types/api.types';
import { FormSubmission, FormSchema } from '../types/form.types';
import { AnalyticsData } from '../types/analytics.types';

/**
 * API Service for handling all HTTP requests to the backend
 */
class ApiService {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
    
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`); // eslint-disable-line no-console
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse<ApiResponse>) => {
        console.log(`Response from ${response.config.url}:`, response.status); // eslint-disable-line no-console
        return response;
      },
      (error) => {
        console.error('Response error:', error);
        
        if (error.response) {
          // Server responded with error status
          const message = error.response.data?.message || 'An error occurred';
          return Promise.reject(new Error(message));
        } else if (error.request) {
          // Request was made but no response received
          return Promise.reject(new Error('Network error - please check your connection'));
        } else {
          // Something else happened
          return Promise.reject(new Error('An unexpected error occurred'));
        }
      }
    );
  }

  /**
   * Generic GET request
   */
  private async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.get<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  private async post<T>(endpoint: string, data: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.post<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  private async put<T>(endpoint: string, data: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.put<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  private async delete<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    const response = await this.api.delete<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  // Form API methods

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

  // Analytics API methods

  /**
   * Get analytics data
   */
  async getAnalytics(): Promise<ApiResponse<AnalyticsData>> {
    return this.get<AnalyticsData>('/analytics');
  }

  // Health check

  /**
   * Check API health
   */
  async healthCheck(): Promise<ApiResponse> {
    const response = await this.api.get('/health');
    return response.data;
  }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;
