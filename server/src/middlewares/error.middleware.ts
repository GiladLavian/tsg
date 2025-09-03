import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/api.types';

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error('Error occurred:', err);

  // Default error response
  const response: ApiResponse = {
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  };

  // Handle specific error types
  if (err.name === 'ValidationError') {
    response.message = 'Validation failed';
    response.error = err.message;
    res.status(400).json(response);
    return;
  }

  if (err.name === 'CastError') {
    response.message = 'Invalid data format';
    response.error = 'Invalid ID format';
    res.status(400).json(response);
    return;
  }

  // Default to 500 server error
  res.status(500).json(response);
};

/**
 * Middleware to handle async errors
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
