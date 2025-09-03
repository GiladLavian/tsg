import { FormField } from '../types/form.types';

/**
 * Validate a single form field based on its configuration
 */
export const validateField = (field: FormField, value: any): string | null => {
  // Check if field is required and empty
  if (field.required && (value === undefined || value === null || value === '')) {
    return `${field.label} is required`;
  }

  // If field is optional and empty, no further validation needed
  if (!field.required && (value === undefined || value === null || value === '')) {
    return null;
  }

  const stringValue = String(value);

  // Type-specific validation
  switch (field.type) {
    case 'email':
      if (!isValidEmail(stringValue)) {
        return 'Please enter a valid email address';
      }
      break;

    case 'number':
      const numValue = Number(value);
      if (isNaN(numValue)) {
        return 'Please enter a valid number';
      }
      if (field.min !== undefined && numValue < field.min) {
        return `Value must be at least ${field.min}`;
      }
      if (field.max !== undefined && numValue > field.max) {
        return `Value must be at most ${field.max}`;
      }
      break;

    case 'date':
      if (!isValidDate(value)) {
        return 'Please enter a valid date';
      }
      break;

    case 'dropdown':
      if (field.options && !field.options.includes(stringValue)) {
        return 'Please select a valid option';
      }
      break;

    case 'text':
    case 'password':
      // Length validation for text fields
      if (field.minLength !== undefined && stringValue.length < field.minLength) {
        return `${field.label} must be at least ${field.minLength} characters long`;
      }
      if (field.maxLength !== undefined && stringValue.length > field.maxLength) {
        return `${field.label} must be at most ${field.maxLength} characters long`;
      }
      break;
  }

  // Custom pattern validation
  if (field.validation?.pattern) {
    try {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(stringValue)) {
        return field.validation.message || 'Invalid format';
      }
    } catch (error) {
      console.warn('Invalid regex pattern:', field.validation.pattern);
    }
  }

  return null;
};

/**
 * Validate email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate date format
 */
const isValidDate = (date: any): boolean => {
  if (!date) return false;
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

/**
 * Format form data for submission
 */
export const formatFormData = (data: Record<string, any>, fields: FormField[]): Record<string, any> => {
  const formatted: Record<string, any> = {};

  fields.forEach(field => {
    const value = data[field.name];
    
    if (value !== undefined && value !== null && value !== '') {
      switch (field.type) {
        case 'number':
          formatted[field.name] = Number(value);
          break;
        case 'date':
          formatted[field.name] = new Date(value).toISOString();
          break;
        default:
          formatted[field.name] = String(value).trim();
      }
    }
  });

  return formatted;
};

/**
 * Get initial form values from schema
 */
export const getInitialFormValues = (fields: FormField[]): Record<string, any> => {
  const initialValues: Record<string, any> = {};

  fields.forEach(field => {
    switch (field.type) {
      case 'number':
        initialValues[field.name] = '';
        break;
      case 'date':
        initialValues[field.name] = '';
        break;
      case 'dropdown':
        initialValues[field.name] = field.options?.[0] || '';
        break;
      default:
        initialValues[field.name] = '';
    }
  });

  return initialValues;
};
