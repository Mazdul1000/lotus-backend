import { z } from 'zod';

const loginZodSchema = z.object({
  body: z.object({
    username: z.string({
        required_error: 'Username must be provided'
    }),
    password: z.string({
      required_error: 'Password must be provided',
    }),
  }),
});

export const AuthValidation = {
  loginZodSchema,
};
