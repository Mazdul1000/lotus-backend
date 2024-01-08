import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    username: z.string({
      required_error: 'Username must be provided',
    }),
    email: z.string({
      required_error: 'Email must be provided',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    role: z.enum(['user', 'admin'], {
      required_error: 'Code is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'Last name is required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    dateOfBirth: z.string({
      required_error: 'Date of Birth is required',
    }),
  }),
})

const userUpdateValidation = z.object({
  body: z.object({
    password: z
      .string({
        required_error: 'Password is required',
      })
      .optional(),
    role: z
      .enum(['user', 'admin'], {
        required_error: 'Code is required',
      })
      .optional(),
    name: z
      .object({
        firstName: z
          .string({
            required_error: 'First name is required',
          })
          .optional(),
        lastName: z
          .string({
            required_error: 'Last name is required',
          })
          .optional(),
      })
      .optional(),
    phoneNumber: z
      .string({
        required_error: 'Phone number is required',
      })
      .optional(),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .optional(),
  }),
})
export const UserValidation = {
  createUserZodSchema,
  userUpdateValidation,
}
