import { z } from 'zod';

const min = 6;
const max = 16;

export const userValidationSchema = z.object({
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
