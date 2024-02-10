import { type NextFunction, type Request, type Response } from 'express';
import i18next from 'i18next';

import { Locale } from '@app/constants';

export function setLanguage(req: Request, _: Response, next: NextFunction): void {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const lang = (req.headers['lang'] || Locale.EN) as string;
  void i18next.changeLanguage(lang, err => {
    if (err) {
      console.error('Error setting language:', err);
    }
    return next();
  });
}
