import { model, Schema, type Document, type CallbackWithoutResultAndOptionalError } from 'mongoose';
import { container } from 'tsyringe';

import { BcryptService } from '@app/services';
import { type IUser } from '@app/interfaces';
import { Roles } from '@app/constants';

const bcryptService = container.resolve(BcryptService);

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'FirstName is Required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'LastName is Required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: 8,
      trim: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: [Roles.ADMIN, Roles.USER],
      default: Roles.USER,
    },
    passwordChangedAt: Date,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

userSchema.index({ firstName: 1, lastName: 1, createdAt: 1, email: 1 });

// Encrypt password using bcrypt
userSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptService.hashPassword(this.password);
  return next();
});

// Compare password using bcrypt
userSchema.methods['matchPassword'] = async function (enteredPassword: string) {
  const isMatch: boolean = await bcryptService.comparePassword(enteredPassword, this['password'] as string);
  return isMatch;
};

// Check password is changed or not.
userSchema.pre('save', function (next: CallbackWithoutResultAndOptionalError) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = new Date(Date.now() - 1000);
  return next();
});

// If password changed throw error
userSchema.methods['changedPasswordAfter'] = function (timestamp: number): boolean {
  if (this['passwordChangedAt']) {
    const changedTimestamp = this['passwordChangedAt'].getTime() / 1000;
    return timestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
};

// Generate and hash password token
userSchema.methods['getResetPasswordToken'] = function (): string {
  const { resetToken, resetPasswordExpire, resetPasswordToken } = bcryptService.getResetPasswordToken();
  this['resetPasswordToken'] = resetPasswordToken;
  this['resetPasswordExpire'] = resetPasswordExpire;
  return resetToken;
};

export const userModel = model<IUser & Document>('User', userSchema);
