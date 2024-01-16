import { type NextFunction, type Response } from 'express';
import { container } from 'tsyringe';
import i18next from 'i18next';

import { UnauthorizedException } from '@app/exceptions';
import { JwtService } from '@app/services';
import { UserModel } from '@app/models';
import { AUTH_TOKEN } from '@app/constants';
import { type IRequest, type IUser } from '@app/interfaces';
import { asyncHandler } from './async.middleware';

const jwtService: JwtService = container.resolve(JwtService);

// @desc   Verify Token Middleware
export const authMiddleware = asyncHandler(async (req: IRequest, _: Response, next: NextFunction): Promise<void> => {
  // 1) Getting token and check of it's there
  let token: string | undefined;
  const { authorization } = req.headers;
  const authCookie = req.cookies[AUTH_TOKEN];
  if (authorization?.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(' ')[1];
  } else if (authCookie) {
    token = authCookie;
  }

  if (!token) {
    return next(new UnauthorizedException(i18next.t('ERROR.NOT_LOGGED_IN')));
  }

  // 2) Verification token
  const decoded = await jwtService.verifyToken<IUser>(token);
  if (!decoded?.id) {
    return next(new UnauthorizedException(i18next.t('ERROR.USER_WITH_TOKEN_NOT_EXIST')));
  }

  // 3) Check if user still exists
  const currentUser = await UserModel.findById(decoded?.id);
  if (!currentUser) {
    return next(new UnauthorizedException(i18next.t('ERROR.USER_WITH_TOKEN_NOT_EXIST')));
  }

  // Check if user changed password after the token was issued
  if (currentUser?.changedPasswordAfter(decoded?.iat)) {
    return next(new UnauthorizedException(i18next.t('ERROR.RECENTLY_CHANGED_PASSWORD')));
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  return next();
});
