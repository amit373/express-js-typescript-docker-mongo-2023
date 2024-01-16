import { injectable } from 'tsyringe';

import { type IQueryString, type IQuery, type IUser } from '@app/interfaces';
import { UserRepository } from '@app/modules/v1/repository';

@injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async fetchUsers(query: IQuery): Promise<IUser[]> {
    query.page = query.page || 1;
    query.limit = query.limit || 3;
    query.fields = 'firstName,lastName,email,role,createdAt,updatedAt';
    const users = await this.userRepository.find(query as IQueryString);
    return users;
  }
}
