import { NextFunction, Request, Response } from 'express';
import { appLogger } from '../../../infrastructure/logging/Logger';

export const errorMiddleware = (error: Error, _req: Request, res: Response, _next: NextFunction): void => {
  appLogger.error(error.message, error.stack);
  res.status(400).json({ success: false, message: error.message });
};
