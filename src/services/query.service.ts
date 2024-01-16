import { IQueryString, type IPagination } from '@app/interfaces';
import { Query } from 'mongoose';
import { injectable } from 'tsyringe';

@injectable()
export class QueryService<T> {
  public query: Query<T[], T>;
  private readonly queryString: IQueryString;

  constructor(query: Query<T[], T>, queryString: IQueryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter(): this {
    const { page, sort, limit, fields, ...queryObj } = this.queryString;
    let queryStr: string = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`);
    const query = JSON.parse(queryStr) as T[];
    this.query = this.query.find(query);
    return this;
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort?.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields?.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  async paginate(): Promise<IPagination<T>> {
    const page = this.queryString.page ? +this.queryString.page : 1;
    const limit = this.queryString.limit ? +this.queryString.limit : 10;
    const skip = (page - 1) * limit;

    try {
      // Execute the query to get the data
      const docs: T[] = await this.query.skip(skip).limit(limit).exec();

      // Count total documents
      const { totalDocs } = await this.countDocuments();

      // Prepare the pagination
      const totalPages: number = Math.ceil(totalDocs / limit);
      const nextPage: number | null = page < totalPages ? page + 1 : null;
      const prevPage: number | null = page > 1 ? page - 1 : null;
      const hasPrevPage: boolean = page > 1;
      const hasNextPage: boolean = page < totalPages;

      // Create and return the pagination object
      const pagination = {
        totalDocs,
        limit,
        page,
        totalPages,
        hasNextPage,
        nextPage,
        hasPrevPage,
        prevPage,
        pagingCounter: page,
      };

      return { docs, pagination };
    } catch (error) {
      // Handle any errors that might occur during pagination
      throw new Error(`Error executing query: ${error}`);
    }
  }

  async countDocuments(): Promise<{
    totalDocs: number;
  }> {
    const totalDocs: number = await this.query.model.countDocuments();
    return {
      totalDocs,
    };
  }
}
