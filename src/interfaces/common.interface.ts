import { type Locale } from '@app/constants';

export type ILocale = (typeof Locale)[keyof typeof Locale];

export interface IQuery {
  sort: string;
  fields: string;
  page: number;
  limit: number;
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
}

export interface IQueryString {
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
  [key: string]: string | number | undefined;
}
