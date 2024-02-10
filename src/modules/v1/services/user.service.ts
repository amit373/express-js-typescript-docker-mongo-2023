import { injectable } from 'tsyringe';

import { type IQueryString, type IQuery, type IUser } from '@app/interfaces';
import { UserRepository } from '@app/modules/v1/repository';
import { prepareQueryOptions } from '@app/utils';

@injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async fetchUsers(reqQuery: IQuery): Promise<IUser[]> {
    const { query, options } = prepareQueryOptions(reqQuery);
    const users = await this.userRepository.find(query as IQueryString, options);
    return users;
  }
}
