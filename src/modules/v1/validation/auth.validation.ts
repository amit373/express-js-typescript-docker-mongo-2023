import { z } from 'zod';

const min = 6;
const max = 16;

export const loginValidation = z.object({
  email: z
    .string({
      required_error: 'VALIDATION.EMAIL.REQUIRED',
    })
    .email('VALIDATION.EMAIL.INVALID'),
  password: z
    .string({
      required_error: 'VALIDATION.PASSWORD.REQUIRED',
    })
    .min(min, 'VALIDATION.PASSWORD.MINIMUM')
    .max(max, 'VALIDATION.PASSWORD.MAXIMUM'),
});

export const signupValidation = z.object({
  firstName: z
    .string({
      required_error: 'VALIDATION.FIRST_NAME.REQUIRED',
    })
    .max(max, 'VALIDATION.FIRST_NAME.MAXIMUM'),
  lastName: z
    .string({
      required_error: 'VALIDATION.LAST_NAME.REQUIRED',
    })
    .max(max, 'VALIDATION.LAST_NAME.MAXIMUM'),
  email: z
    .string({
      required_error: 'VALIDATION.EMAIL.REQUIRED',
    })
    .email('VALIDATION.EMAIL.INVALID'),
  password: z
    .string({
      required_error: 'VALIDATION.PASSWORD.REQUIRED',
    })
    .min(min, 'VALIDATION.PASSWORD.MINIMUM')
    .max(max, 'VALIDATION.PASSWORD.MAXIMUM'),
});
