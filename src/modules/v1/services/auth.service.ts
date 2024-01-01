import { injectable } from 'tsyringe';

import { type IUser, type LoginUserDto, type SignupUserDto } from '@app/interfaces';
import { UserRepository } from '@app/modules/v1/repository';
import { BadRequestException } from '@app/exceptions';

@injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async signup(userData: SignupUserDto): Promise<IUser> {
    const { email, firstName, lastName, password } = userData;
    const user = await this.userRepository.findOne({ email: userData.email });
    if (user) {
      throw new BadRequestException('ERROR.EMAIL_ALREADY_EXIST');
    }
    return await this.userRepository.create({ firstName, lastName, email, password });
  }

  public async login(userData: LoginUserDto): Promise<LoginUserDto> {
    return userData;
  }
}
