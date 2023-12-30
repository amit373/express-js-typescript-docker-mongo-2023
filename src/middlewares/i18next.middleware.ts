import { Locale } from '@app/constants';
import { type NextFunction, type Request, type Response } from 'express';
import i18next from 'i18next';

export function setLanguage(req: Request, _: Response, next: NextFunction): void {
  const { lang } = req.headers;
  void i18next.changeLanguage((lang as string) || Locale.EN, err => {
    if (err) {
      console.error('Error setting language:', err);
    }
    return next();
  });
}
