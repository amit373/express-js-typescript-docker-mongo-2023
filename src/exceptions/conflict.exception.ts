import i18next from 'i18next';
import { HttpStatus } from '@app/constants';

import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  public override status: number = HttpStatus.CONFLICT;
  public override message: string;

  constructor(message?: string) {
    super(message!);
    this.message = i18next.t(message ?? 'HTTP.CONFLICT');
    Error.captureStackTrace(this, this.constructor);
  }
}
