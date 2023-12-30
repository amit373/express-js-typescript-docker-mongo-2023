import i18next from 'i18next';
import { HttpStatus } from '@app/constants';

import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  public override status: number = HttpStatus.FORBIDDEN;
  public override message: string;

  constructor(message?: string) {
    super(message!);
    this.message = i18next.t(message ?? 'HTTP.FORBIDDEN');
    Error.captureStackTrace(this, this.constructor);
  }
}
