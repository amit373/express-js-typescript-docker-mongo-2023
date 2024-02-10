import { type NextFunction, type Response } from 'express';
import i18next from 'i18next';

import { UnauthorizedException } from '@app/exceptions';
import { config } from '@app/config';
import { xApiKey } from '@app/constants';
import { type IRequest } from '@app/interfaces';
import { asyncHandler } from '@app/middlewares';

// @desc   Verify Api key Middleware
export const apiKeyMiddleware = asyncHandler(async (req: IRequest, _: Response, next: NextFunction): Promise<void> => {
  const apiKey = req.headers[xApiKey] as string;
  if (!apiKey) {
    return next(new UnauthorizedException(i18next.t('ERROR.INVALID_API_KEY')));
  }

  // 2) Validate api key
  if (config.API_KEY.toLowerCase() !== apiKey.toLowerCase()) {
    return next(new UnauthorizedException(i18next.t('ERROR.INVALID_API_KEY')));
  }

  return next();
});
