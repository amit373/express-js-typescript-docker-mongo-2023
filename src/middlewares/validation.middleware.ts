import { type Request, type Response, type NextFunction } from 'express';
import { type AnyZodObject, type ZodError, type ZodIssue } from 'zod';

import { HttpStatus } from '@app/constants';

interface IOptions {
  body?: boolean;
  query?: boolean;
  params?: boolean;
}

export const validate =
  <T = any>(
    schema: AnyZodObject,
    options: IOptions = {
      body: true,
      query: false,
      params: false,
    },
  ) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        ...(options?.body && { body: req?.body as T }),
        ...(options?.query && { query: req?.query as T }),
        ...(options?.params && { body: req?.params as T }),
      });
      next();
    } catch (error: any) {
      const zero = 0;
      const issues: ZodIssue[] = (error as ZodError)?.issues ?? [];
      const message: string = issues?.length > zero ? issues[zero]?.message : error?.message;
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message,
      });
    }
  };
