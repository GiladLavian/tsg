import { BaseType } from './base';
import { ValidationError } from './api.types';

/**
 * Form field validation rules class
 */
export class FormFieldValidation {
  pattern?: string;
  message?: string;

  constructor(pattern?: string, message?: string) {
    this.pattern = pattern;
    this.message = message;
  }
}

/**
 * Form field class
 */
export class FormField {
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
  validation?: FormFieldValidation;

  constructor(
    name: string,
    type: FormField['type'],
    label: string,
    options?: Partial<Omit<FormField, 'name' | 'type' | 'label'>>,
  ) {
    this.name = name;
    this.type = type;
    this.label = label;
    if (options) {
      Object.assign(this, options);
    }
  }

  /**
   * Validate field value
   */
  validate(value: any): string | null {
    if (this.required && (value === undefined || value === null || value === '')) {
      return `${this.label} is required`;
    }

    if (this.validation?.pattern && typeof value === 'string') {
      const regex = new RegExp(this.validation.pattern);
      if (!regex.test(value)) {
        return this.validation.message || `${this.label} format is invalid`;
      }
    }

    if (typeof value === 'string') {
      if (this.minLength && value.length < this.minLength) {
        return `${this.label} must be at least ${this.minLength} characters`;
      }
      if (this.maxLength && value.length > this.maxLength) {
        return `${this.label} must not exceed ${this.maxLength} characters`;
      }
    }

    if (typeof value === 'number') {
      if (this.min !== undefined && value < this.min) {
        return `${this.label} must be at least ${this.min}`;
      }
      if (this.max !== undefined && value > this.max) {
        return `${this.label} must not exceed ${this.max}`;
      }
    }

    return null;
  }
}

/**
 * Form schema class
 */
export class FormSchema extends BaseType {
  id?: string;
  name: string;
  description?: string;
  fields: FormField[];

  constructor(
    name: string,
    fields: FormField[],
    options?: Partial<Pick<FormSchema, 'id' | 'description' | 'createdAt' | 'updatedAt'>>,
  ) {
    super();
    this.name = name;
    this.fields = fields;
    if (options) {
      Object.assign(this, options);
    }
  }

  /**
   * Validate form data against this schema
   */
  validateData(data: Record<string, any>): ValidationError[] {
    const errors: ValidationError[] = [];

    this.fields.forEach(field => {
      const value = data[field.name];
      const error = field.validate(value);
      if (error) {
        errors.push(new ValidationError(field.name, error));
      }
    });

    return errors;
  }

  /**
   * Get field by name
   */
  getField(name: string): FormField | undefined {
    return this.fields.find(field => field.name === name);
  }
}

/**
 * Form submission class
 */
export class FormSubmission extends BaseType {
  id?: string;
  data: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    data: Record<string, any>,
    options?: Partial<Pick<FormSubmission, 'id' | 'createdAt' | 'updatedAt'>>,
  ) {
    super();
    this.data = data;
    if (options) {
      Object.assign(this, options);
    }
  }

  /**
   * Get submission value by field name
   */
  getValue(fieldName: string): any {
    return this.data[fieldName];
  }

  /**
   * Set submission value by field name
   */
  setValue(fieldName: string, value: any): void {
    this.data[fieldName] = value;
    this.updatedAt = new Date();
  }
}
