import { type ObjectId } from 'mongoose';
import { type Roles } from '@app/constants';

export interface IUser extends Document {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isVerified: boolean;
  isActive: boolean;
  role: Roles;
  passwordChangedAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
  changedPasswordAfter: (timestamp: number) => boolean;
  getResetPasswordToken: () => string;
}

export type LoginUserDto = Pick<IUser, 'email' | 'password'>;

export type SignupUserDto = Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName'>;
