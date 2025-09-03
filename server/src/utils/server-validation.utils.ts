import Joi from 'joi';
import { FormSchema, FormField } from '../types/form.types';

/**
 * Validation schema for form submission
 */
export const formSubmissionSchema = Joi.object({
  data: Joi.object().required().min(1).message('Form data is required'),
});

/**
 * Validation schema for form schema creation/update
 */
export const formSchemaSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).pattern(/^[a-zA-Z0-9-_]+$/)
    .message('Name must contain only letters, numbers, hyphens, and underscores'),
  description: Joi.string().optional().max(500),
  fields: Joi.array().items(
    Joi.object({
      name: Joi.string().required().min(1).max(50).pattern(/^[a-zA-Z][a-zA-Z0-9_]*$/)
        .message('Field name must start with a letter and contain only letters, numbers, and underscores'),
      type: Joi.string().required().valid('text', 'email', 'password', 'date', 'number', 'dropdown'),
      label: Joi.string().required().min(1).max(100),
      required: Joi.boolean().optional().default(false),
      minLength: Joi.number().optional().min(0),
      maxLength: Joi.number().optional().min(1),
      min: Joi.number().optional(),
      max: Joi.number().optional(),
      options: Joi.array().items(Joi.string()).optional(),
      placeholder: Joi.string().optional().max(200),
      validation: Joi.object({
        pattern: Joi.string().optional(),
        message: Joi.string().optional().max(200),
      }).optional(),
    }),
  ).required().min(1).max(20),
});

/**
 * Create dynamic validation schema based on form schema
 */
export const createDynamicValidation = (schema: FormSchema): Joi.ObjectSchema => {
  const validationObject: Record<string, Joi.Schema> = {};

  schema.fields.forEach((field: FormField) => {
    let fieldSchema: Joi.Schema;

    switch (field.type) {
      case 'email':
        fieldSchema = Joi.string().email();
        break;
      case 'number':
        fieldSchema = Joi.number();
        if (field.min !== undefined) {
          fieldSchema = (fieldSchema as Joi.NumberSchema).min(field.min);
        }
        if (field.max !== undefined) {
          fieldSchema = (fieldSchema as Joi.NumberSchema).max(field.max);
        }
        break;
      case 'date':
        fieldSchema = Joi.date().iso();
        break;
      case 'dropdown':
        if (field.options && field.options.length > 0) {
          fieldSchema = Joi.string().valid(...field.options);
        } else {
          fieldSchema = Joi.string();
        }
        break;
      default:
        fieldSchema = Joi.string();
        if (field.minLength !== undefined) {
          fieldSchema = (fieldSchema as Joi.StringSchema).min(field.minLength);
        }
        if (field.maxLength !== undefined) {
          fieldSchema = (fieldSchema as Joi.StringSchema).max(field.maxLength);
        }
        break;
    }

    // Add custom pattern validation if specified
    if (field.validation?.pattern && field.type !== 'email') {
      try {
        fieldSchema = (fieldSchema as Joi.StringSchema).pattern(new RegExp(field.validation.pattern));
        if (field.validation.message) {
          fieldSchema = fieldSchema.message(field.validation.message);
        }
      } catch (error) {
        console.warn(`Invalid regex pattern for field ${field.name}:`, field.validation.pattern);
      }
    }

    // Set required/optional
    if (field.required) {
      fieldSchema = fieldSchema.required();
    } else {
      fieldSchema = fieldSchema.optional().allow('', null);
    }

    validationObject[field.name] = fieldSchema;
  });

  return Joi.object(validationObject);
};
