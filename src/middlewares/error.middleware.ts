/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextFunction, type Request, type Response } from 'express';
import i18next from 'i18next';

import { config } from '@app/config';
import { HttpStatus } from '@app/constants';
import { UnauthorizedException } from '@app/exceptions';
import { logger } from '@app/libs';

interface IError extends Error {
  status: number;
  message: string;
  name: string;
}

const logError = (err: IError, req: Request, res: Response): void => {
  const message: string = i18next.t(err?.message || res?.statusMessage || 'ERROR.SOMETHING_WENT_WRONG');
  logger.error(
    `${err?.status} - ${req.originalUrl} [${i18next.language}] [${req.method}] ${
      config.logPayloadInLogger
        ? JSON.stringify({
            ...(Object.keys(req.body).length && {
              body: req.body,
            }),
            ...(Object.keys(req.query).length && {
              params: req.params,
            }),
            ...(Object.keys(req.query).length && {
              query: req.query,
            }),
          })
        : ''
    } - ${message} `,
  );
};

const handleJWTError = (err: IError): UnauthorizedException => {
  const error = { ...err, message: i18next.t('ERROR.INVALID_TOKEN') };
  return new UnauthorizedException(error.message);
};

const handleJWTExpiredError = (err: IError): UnauthorizedException => {
  const error = { ...err, message: i18next.t('ERROR.TOKEN_EXPIRED') };
  return new UnauthorizedException(error.message);
};

const sendError = (err: IError, req: Request, res: Response): Response<any, Record<string, any>> => {
  const message: string = i18next.t(err.message);
  const status = err.status;
  logError(err, req, res);
  return res.status(status).json({
    success: status.toString().startsWith('2'),
    status,
    message,
    lang: i18next.language,
  });
};

export const errorMiddleware = (err: IError, req: Request, res: Response, next: NextFunction): void => {
  try {
    let error = { ...err };
    error.status = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = i18next.t(err?.message || 'ERROR.INTERNAL_SERVER_ERROR');
    if (error?.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (error?.name === 'TokenExpiredError') error = handleJWTExpiredError(err);
    sendError(error, req, res);
  } catch (error) {
    next(error);
  }
};
