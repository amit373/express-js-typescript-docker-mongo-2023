import { defaultPagination } from '@app/constants';
import { type IQuery, type IQueryOptions } from '@app/interfaces';
import { fetchUsersFields } from '@app/modules/v1/constants';
import { isUndefined } from './env.utils';

export function prepareQueryOptions(query: IQuery): {
  query: IQuery;
  options: IQueryOptions;
} {
  const options: IQueryOptions = {
    filter: false,
    limitFields: true,
    paginate: false,
    sort: true,
    totalCount: false,
    search: false,
  };
  if (!isUndefined(query?.page) && !isUndefined(query?.limit)) {
    options.paginate = true;
    query.page = query?.page || defaultPagination.page;
    query.limit = query?.limit || defaultPagination.limit;
  }
  if (!isUndefined(query?.fields)) {
    options.limitFields = true;
    const fields = query?.fields || '';
    query.fields = fields.toString();
  }
  if (!isUndefined(query?.searchKey)) {
    query.searchKey = query?.searchKey || '';
    if (query?.searchKey) {
      query.searchKey = query.searchKey ?? '';
    }
    query.searchFields = !isUndefined(query?.searchFields)
      ? query?.searchFields
      : [(fetchUsersFields.firstName, fetchUsersFields.lastName, fetchUsersFields.email)];
    options.search = true;
  }
  if (!isUndefined(query?.sort)) {
    options.sort = true;
    const sort = query?.sort || '';
    query.sort = sort.toString();
  }
  if (!isUndefined(query?.totalCount)) {
    options.totalCount = query?.totalCount === 'true';
  }
  return {
    query,
    options,
  };
}
