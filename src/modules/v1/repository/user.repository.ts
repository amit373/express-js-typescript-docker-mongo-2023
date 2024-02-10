import { injectable } from 'tsyringe';
import { type ClientSession, type FilterQuery } from 'mongoose';
import { type IQueryString, type IQueryOptions, type IUser } from '@app/interfaces';
import { UserModel } from '@app/models';
import { BaseRepository } from '@app/utils';

@injectable()
export class UserRepository extends BaseRepository {
  async findOne<T>(query: FilterQuery<T>): Promise<IUser | null> {
    return await UserModel.findOne(query);
  }

  async find(query: IQueryString = {} satisfies IQueryString, options: IQueryOptions): Promise<IUser[]> {
    return await this.prepareQuery<IUser>(UserModel, query, options);
  }

  async create<T>(body: T, session?: ClientSession): Promise<IUser> {
    const options = session ? { session } : {};
    const result = await UserModel.create([body], options);
    return result[0]! as IUser;
  }

  // Note: Transaction only works with replica sets
  async createWithTransaction<T>(body: T): Promise<IUser> {
    const session = await UserModel.startSession();
    session.startTransaction();
    try {
      const user = await this.create(body, session);
      await session.commitTransaction();
      return user;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
