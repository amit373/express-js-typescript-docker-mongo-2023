import { type Request, type Response, type NextFunction } from 'express';
import { type ZodError, type ZodIssue, type AnyZodObject } from 'zod';
import i18next from 'i18next';

import { HttpStatus, Locale } from '@app/constants';
import { isUndefined } from '@app/utils';

interface ValidationOptions {
  body?: boolean;
  query?: boolean;
  params?: boolean;
}

type ExtendedZodIssue = ZodIssue & {
  maximum: number;
  minimum: number;
};

export const validate =
  <T = any>(
    schema: AnyZodObject,
    options: ValidationOptions = {
      body: true,
      query: false,
      params: false,
    },
  ) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    void i18next.changeLanguage((req.headers['lang'] as string) || Locale.EN);
    try {
      if (options.body) await schema.parseAsync(req.body as T);
      if (options.query) await schema.parseAsync(req.query as T);
      if (options.params) await schema.parseAsync(req.params as T);
      return next();
    } catch (error: any) {
      const zero = 0;
      const issues = ((error as ZodError)?.issues ?? []) as ExtendedZodIssue[];
      const message: string = issues.length > zero ? issues[zero]?.message : error.message;
      let localizedMessage: string = i18next.t(message);
      if (!isUndefined(issues[zero]?.minimum)) {
        localizedMessage = i18next.t(message, { minimum: issues[zero]?.minimum });
      }
      if (!isUndefined(issues[zero]?.maximum)) {
        localizedMessage = i18next.t(message, { maximum: issues[zero]?.maximum });
      }
      return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        success: false,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        message: localizedMessage,
      });
    }
  };
