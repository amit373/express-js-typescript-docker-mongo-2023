import { type Request, type NextFunction, type Response } from 'express';
import i18next from 'i18next';

import { ForbiddenException } from '@app/exceptions';
import { type Roles } from '@app/constants';
import { type IRequest } from '@app/interfaces';

export const restrictTo =
  (...roles: Roles[]) =>
  (req: Request, _: Response, next: NextFunction): void => {
    const request = req as IRequest;
    const role = request?.user?.role;
    if (!role || !roles.includes(role)) {
      throw new ForbiddenException(i18next.t('ERROR.PERMISSION_DENIED'));
    }
    return next();
  };
