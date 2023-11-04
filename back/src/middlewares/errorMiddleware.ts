import { logger } from '../config/logger';
import { NextFunction, Request, Response } from 'express';
import { IError } from '../types/error';

export const errorMiddleware = (
  error: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error.statusCode === null || error.statusCode === undefined)
    error.statusCode = 500;

  logger.error(
    `statusCode: ${error.statusCode} | Error Message: ${error.message} `,
  );

  res.status(error.statusCode).send(error.message);
};
