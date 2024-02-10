import { type Request } from 'express';
import { type IncomingHttpHeaders } from 'http';
import { type xApiKey, type AUTH_TOKEN, type Locale } from '@app/constants';

import { type IUser } from './user.interface';

export type ILocale = (typeof Locale)[keyof typeof Locale];

export interface IQuery {
  sort: string;
  fields: string;
  page: number;
  limit: number;
  searchKey: string;
  searchFields: string[];
  totalCount: boolean | string;
}

export interface IPagination<T> {
  docs: T[];
  pagination: {
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    nextPage: number | null;
    hasPrevPage: boolean;
    prevPage: number | null;
    pagingCounter: number;
  };
}

export interface IQueryOptions {
  filter: boolean;
  sort: boolean;
  paginate: boolean;
  limitFields: boolean;
  totalCount: boolean;
  search: boolean;
}

export interface IQueryString {
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
  searchKey?: string;
  searchFields?: string[];
  [key: string]: unknown | string | string[] | number | undefined;
  totalCount?: boolean;
}

interface CustomCookies {
  [xApiKey]: string;
  [AUTH_TOKEN]: string;
}
interface CustomHeaders {
  authorization?: string;
  lang: ILocale;
}

type ExtendedHeaders = IncomingHttpHeaders & CustomHeaders;

export interface IRequest<TParams = any, TBody = any, TQuery = any, TResBody = any> extends Request<TParams, TBody, TResBody, TQuery> {
  user?: IUser;
  headers: ExtendedHeaders;
  cookies: CustomCookies;
}
