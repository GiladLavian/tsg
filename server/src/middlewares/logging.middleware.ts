import { Request, Response, NextFunction } from 'express';

/**
 * Logging middleware to track all incoming requests
 */
export const loggingMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, url, ip } = req;
  
  console.log(`[${new Date().toISOString()}] ${method} ${url} - IP: ${ip}`); // eslint-disable-line no-console
  
  // Log response time when request completes
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} ${url} - ${res.statusCode} - ${duration}ms`); // eslint-disable-line no-console
  });
  
  next();
};
