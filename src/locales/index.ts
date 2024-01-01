import { Locale } from '@app/constants';
import { resolve } from 'path';

export const i18nextConfig = {
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: resolve(__dirname, './{{lng}}/{{ns}}.json'),
  },
  debug: false,
  detection: {
    order: ['querystring', 'cookie'],
    caches: ['cookie'],
  },
  preload: [Locale.EN, Locale.HI],
  saveMissing: false,
  fallbackLng: Locale.EN,
  escapeValue: false,
} as const;
