import i18next from 'i18next';
import { HttpStatus } from '@app/constants';

import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  public override status: number = HttpStatus.NOT_FOUND;
  public override message: string;

  constructor(message?: string) {
    super(message!);
    this.message = i18next.t(message ?? 'HTTP.NOT_FOUND');
    Error.captureStackTrace(this, this.constructor);
  }
}
