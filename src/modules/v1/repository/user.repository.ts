import { type FilterQuery } from 'mongoose';
import { injectable } from 'tsyringe';

import { type IUser } from '@app/interfaces';
import { UserModel } from '@app/models';

@injectable()
export class UserRepository {
  async findOne<T>(query: FilterQuery<T>): Promise<IUser | null> {
    return await UserModel.findOne(query);
  }

  async create<T>(body: T): Promise<IUser> {
    return await UserModel.create(body);
  }
}
