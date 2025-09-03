import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { ApiResponse, ValidationError } from '../types/api.types';

/**
 * Validation middleware factory
 */
export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors: ValidationError[] = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message,
      }));
      
      const response: ApiResponse = {
        success: false,
        message: 'Validation failed',
        errors,
      };
      
      res.status(400).json(response);
      return;
    }
    
    next();
  };
};
