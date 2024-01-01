import { type Request, type Response } from 'express';
import { container } from 'tsyringe';
import i18next from 'i18next';

import { HttpStatus, Locale } from '@app/constants';
import { LoggerService } from '@app/libs';
import { type ILocale } from '@app/interfaces';

interface ResponseData<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
  lang?: ILocale;
}

const loggerService = container.resolve(LoggerService);

export class Controller<T = any> {
  protected responseData: ResponseData<T> = {
    success: false,
    status: HttpStatus.BAD_REQUEST,
    message: 'STATUS.BAD_REQUEST',
    data: null as T,
    lang: Locale.EN,
  };

  protected setResponseData(lang: ILocale = Locale.EN): void {
    this.responseData = {
      success: false,
      status: HttpStatus.BAD_REQUEST,
      message: 'STATUS.BAD_REQUEST',
      data: null as T,
      lang,
    };
  }

  protected setSuccessData(data?: T, message?: string, status: number = HttpStatus.OK, lang: ILocale = Locale.EN): void {
    this.setResponseData();
    this.responseData = {
      success: true,
      status,
      message: i18next.t(message! || 'STATUS.OK'),
      data: data ?? null,
      lang,
    };
  }

  protected setErrors(error: Error, lang: ILocale = Locale.EN): void {
    this.responseData = {
      success: false,
      status: HttpStatus.OK,
      message: i18next.t(error?.message || 'STATUS.BAD_REQUEST'),
      data: null as T,
      lang,
    };
  }

  protected sendResponse(req: Request, res: Response): Response<ResponseData> {
    this.responseData.lang = ((req.headers['lang'] as string) || Locale.EN) as ILocale;
    loggerService.info(`${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - [${this.responseData.lang}] - ${this.responseData.message} `);
    return res.status(this.responseData.status).json(this.responseData);
  }
}
