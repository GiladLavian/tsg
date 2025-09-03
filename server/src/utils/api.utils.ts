import { ApiResponse } from '../types/api.types';

/**
 * Utility functions for API responses
 */
export class ApiUtils {
  /**
   * Create a success response
   */
  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
    };
  }

  /**
   * Create an error response
   */
  static error(message: string, error?: string): ApiResponse {
    return {
      success: false,
      message,
      error,
    };
  }

  /**
   * Create a validation error response
   */
  static validationError(errors: Array<{ field: string; message: string }>): ApiResponse {
    return {
      success: false,
      message: 'Validation failed',
      errors,
    };
  }
}

/**
 * Utility function to check if two objects are deeply equal
 */
export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;
  
  if (obj1 == null || obj2 == null) return false;
  
  if (typeof obj1 !== typeof obj2) return false;
  
  if (typeof obj1 !== 'object') return obj1 === obj2;
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) return false;
  
  for (const key of keys1) {
    if (!keys2.includes(key)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }
  
  return true;
};

/**
 * Utility function to sanitize form data
 */
export const sanitizeFormData = (data: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {};
  
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined) {
      // Trim strings
      if (typeof value === 'string') {
        sanitized[key] = value.trim();
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
};
