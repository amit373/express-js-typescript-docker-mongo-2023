import { type Locale } from '@app/constants';

export type ILocale = (typeof Locale)[keyof typeof Locale];
