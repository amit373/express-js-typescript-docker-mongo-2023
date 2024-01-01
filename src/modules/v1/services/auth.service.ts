import { injectable } from 'tsyringe';

import { type CreateUserDto } from '@app/interfaces';

@injectable()
export class AuthService {
  public async signup(userData: CreateUserDto): Promise<CreateUserDto> {
    return userData;
  }

  public async login(userData: CreateUserDto): Promise<CreateUserDto> {
    return userData;
  }
}
