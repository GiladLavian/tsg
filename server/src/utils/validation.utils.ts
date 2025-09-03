import Joi from 'joi';

/**
 * Validation schema for form submission
 */
export const formSubmissionSchema = Joi.object({
  data: Joi.object().required().min(1).messages({
    'object.base': 'Form data must be an object',
    'object.min': 'Form data cannot be empty',
    'any.required': 'Form data is required',
  }),
});

/**
 * Validation schema for form schema creation
 */
export const formSchemaSchema = Joi.object({
  name: Joi.string().required().min(1).max(100).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name cannot be empty',
    'string.max': 'Name cannot exceed 100 characters',
    'any.required': 'Name is required',
  }),
  description: Joi.string().optional().max(500).messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description cannot exceed 500 characters',
  }),
  fields: Joi.array().items(
    Joi.object({
      name: Joi.string().required().min(1).max(50).messages({
        'string.base': 'Field name must be a string',
        'string.min': 'Field name cannot be empty',
        'string.max': 'Field name cannot exceed 50 characters',
        'any.required': 'Field name is required',
      }),
      type: Joi.string().valid('text', 'email', 'password', 'date', 'number', 'dropdown').required().messages({
        'any.only': 'Field type must be one of: text, email, password, date, number, dropdown',
        'any.required': 'Field type is required',
      }),
      label: Joi.string().required().min(1).max(100).messages({
        'string.base': 'Field label must be a string',
        'string.min': 'Field label cannot be empty',
        'string.max': 'Field label cannot exceed 100 characters',
        'any.required': 'Field label is required',
      }),
      required: Joi.boolean().optional(),
      minLength: Joi.number().integer().min(0).optional(),
      maxLength: Joi.number().integer().min(1).optional(),
      min: Joi.number().optional(),
      max: Joi.number().optional(),
      options: Joi.array().items(Joi.string()).optional(),
      placeholder: Joi.string().optional().max(100),
      validation: Joi.object({
        pattern: Joi.string().optional(),
        message: Joi.string().optional().max(200),
      }).optional(),
    }),
  ).required().min(1).max(20).messages({
    'array.base': 'Fields must be an array',
    'array.min': 'At least one field is required',
    'array.max': 'Cannot have more than 20 fields',
    'any.required': 'Fields array is required',
  }),
});

/**
 * Dynamic validation based on form schema
 */
export const createDynamicValidation = (formSchema: any) => {
  const schemaObject: any = {};
  
  if (formSchema.fields && formSchema.fields.length > 0) {
    formSchema.fields.forEach((field: any) => {
      let validator: Joi.AnySchema;
      
      // Create base validator based on field type
      switch (field.type) {
        case 'text':
        case 'password':
          validator = Joi.string();
          break;
        case 'email':
          validator = Joi.string().email();
          break;
        case 'number': {
          let numberValidator = Joi.number();
          if (field.min !== undefined) numberValidator = numberValidator.min(field.min);
          if (field.max !== undefined) numberValidator = numberValidator.max(field.max);
          validator = numberValidator;
          break;
        }
        case 'date':
          validator = Joi.date();
          break;
        case 'dropdown':
          if (field.options && field.options.length > 0) {
            validator = Joi.string().valid(...field.options);
          } else {
            validator = Joi.string();
          }
          break;
        default:
          validator = Joi.string();
          break;
      }
      
      // Apply common validation rules
      if (field.required) {
        validator = validator.required();
      } else {
        validator = validator.optional();
      }
      
      if (field.minLength && (field.type === 'text' || field.type === 'password')) {
        validator = (validator as Joi.StringSchema).min(field.minLength);
      }
      
      if (field.maxLength && (field.type === 'text' || field.type === 'password' || field.type === 'email')) {
        validator = (validator as Joi.StringSchema).max(field.maxLength);
      }
      
      // Apply pattern validation if specified
      if (field.validation && field.validation.pattern) {
        try {
          const pattern = new RegExp(field.validation.pattern);
          validator = (validator as Joi.StringSchema).pattern(pattern);
        } catch (error) {
          // Invalid regex pattern, skip pattern validation
        }
      }
      
      schemaObject[field.name] = validator;
    });
  }
  
  return Joi.object(schemaObject);
};
