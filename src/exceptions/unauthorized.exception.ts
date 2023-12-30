import i18next from 'i18next';
import { HttpStatus } from '@app/constants';

import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  public override status: number = HttpStatus.UNAUTHORIZED;
  public override message: string;

  constructor(message?: string) {
    super(message!);
    this.message = i18next.t(message ?? 'HTTP.UNAUTHORIZED');
    Error.captureStackTrace(this, this.constructor);
  }
}
