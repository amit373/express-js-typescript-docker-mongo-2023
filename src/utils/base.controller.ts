import { type Request, type Response } from 'express';
import i18next from 'i18next';
import { HttpStatus } from '@app/constants';
import { LoggerService } from '@app/libs';
import { container } from 'tsyringe';

interface ResponseData<T = any> {
  success: boolean;
  status: number;
  message: string;
  data: T | null;
}

const loggerService = container.resolve(LoggerService);

export class Controller<T = any> {
  protected responseData: ResponseData<T> = {
    success: false,
    status: HttpStatus.OK,
    message: 'STATUS.OK',
    data: null as T,
  };

  protected setResponseData(): void {
    this.responseData = {
      success: false,
      status: HttpStatus.OK,
      message: 'STATUS.OK',
      data: null as T,
    };
  }

  protected setSuccessData(data?: T, message?: string, status: number = HttpStatus.OK): void {
    this.responseData = {
      success: true,
      status,
      message: i18next.t(message! || 'STATUS.OK'),
      data: data ?? null,
    };
  }

  protected setErrors(error: Error): void {
    this.responseData = {
      success: false,
      status: HttpStatus.OK,
      message: i18next.t(error?.message || 'STATUS.BAD_REQUEST'),
      data: null as T,
    };
  }

  protected sendResponse(req: Request, res: Response): Response<ResponseData> {
    loggerService.info(`${HttpStatus.CREATED} - ${req.originalUrl} [${req.method}] - ${this.responseData.message} `, {});
    return res.status(this.responseData.status).json(this.responseData);
  }
}
