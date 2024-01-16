import { injectable } from 'tsyringe';

import { type IUser, type LoginUserDto, type SignupUserDto } from '@app/interfaces';
import { UserRepository } from '@app/modules/v1/repository';
import { BadRequestException, UnauthorizedException } from '@app/exceptions';
import { JwtService } from '@app/services';

@injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async signup(userData: SignupUserDto): Promise<Partial<IUser>> {
    const { email: enteredEmail, firstName: enteredFirstName, lastName: enteredLastName, password } = userData;
    const user = await this.userRepository.findOne({ email: userData.email });
    if (user) {
      throw new BadRequestException('ERROR.EMAIL_ALREADY_EXIST');
    }
    const createdUser = await this.userRepository.create({
      firstName: enteredFirstName,
      lastName: enteredLastName,
      email: enteredEmail,
      password,
    });
    const { id, firstName, lastName, email, role, createdAt } = createdUser.toObject();
    return {
      id,
      email,
      role,
      firstName,
      lastName,
      createdAt,
    };
  }

  public async login({ email: enteredEmail, password: enteredPassword }: LoginUserDto): Promise<{ user: Partial<IUser>; token: string }> {
    // Check for user
    const user = await this.userRepository.findOne({ email: enteredEmail });

    if (!user) {
      throw new UnauthorizedException('ERROR.INVALID_CREDENTIALS');
    }

    // Check current password
    if (!(await user?.matchPassword(enteredPassword))) {
      throw new UnauthorizedException('ERROR.INVALID_CREDENTIALS');
    }

    const { id, firstName, lastName, email, role, createdAt } = user.toObject();

    // Create token
    const token = this.jwtService.signToken(id);

    return {
      user: {
        id,
        email,
        role,
        firstName,
        lastName,
        createdAt,
      },
      token,
    };
  }
}
