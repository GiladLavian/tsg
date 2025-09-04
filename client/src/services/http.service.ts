import axios, { AxiosInstance, AxiosResponse } from 'axios';

/**
 * Base HTTP service class that provides common HTTP functionality
 * and axios configuration for all domain-specific services
 */
export class BaseHttpService {
  protected api: AxiosInstance;

  constructor(baseURL?: string) {
    // Create axios instance with configuration
    this.api = axios.create({
      baseURL: baseURL || process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        // Add auth token if available
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, config.data);
        }
        
        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
        }
        return response;
      },
      (error) => {
        // Handle common errors
        if (error.response?.status === 401) {
          // Unauthorized - redirect to login or refresh token
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        
        // Extract error message from server response
        let errorMessage = error.message;
        if (error.response?.data) {
          // Try to get the error message from the server response
          const serverResponse = error.response.data;
          if (serverResponse.error) {
            errorMessage = serverResponse.error;
          } else if (serverResponse.message) {
            errorMessage = serverResponse.message;
          }
        }
        
        console.error('API Error:', error.response?.data || error.message);
        
        // Create a new error with the extracted message
        const enhancedError = new Error(errorMessage);
        enhancedError.name = error.name;
        
        // Preserve the original error properties
        Object.assign(enhancedError, {
          response: error.response,
          status: error.response?.status,
          data: error.response?.data
        });
        
        return Promise.reject(enhancedError);
      }
    );
  }

  /**
   * Generic GET request
   */
  protected async get<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.api.get(url, config);
    return response.data;
  }

  /**
   * Generic POST request
   */
  protected async post<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  /**
   * Generic PUT request
   */
  protected async put<T>(url: string, data?: any, config?: any): Promise<ApiResponse<T>> {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  /**
   * Generic DELETE request
   */
  protected async delete<T>(url: string, config?: any): Promise<ApiResponse<T>> {
    const response = await this.api.delete(url, config);
    return response.data;
  }
}

/**
 * Standard API response interface
 */
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Error response interface
 */
export interface ApiError {
  success: false;
  error: string;
  message?: string;
}
