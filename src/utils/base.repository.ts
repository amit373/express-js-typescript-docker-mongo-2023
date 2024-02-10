import { type Model, type QueryOptions } from 'mongoose';
import { QueryService } from '@app/services';
import { type IQueryOptions } from '@app/interfaces';
import { injectable } from 'tsyringe';

@injectable()
export class BaseRepository {
  protected async prepareQuery<T>(model: Model<T>, query: QueryOptions, options: IQueryOptions): Promise<T[]> {
    let queryService = new QueryService<T>(model.find(), query);

    if (options?.filter) {
      queryService = queryService.filter();
    }

    if (options?.sort) {
      queryService = queryService.sort();
    }

    if (options?.limitFields) {
      queryService = queryService.limitFields();
    }

    if (options?.search) {
      queryService = queryService.search();
    }

    if (options?.paginate) {
      const result = await queryService.paginate();
      return result as unknown as T[];
    } else {
      if (options?.totalCount) {
        const { totalDocs } = await queryService.countDocuments(queryService.query);
        const docs = await queryService.query;
        return {
          docs,
          totalDocs,
        } as unknown as T[];
      }
      return await queryService.query;
    }
  }
}
