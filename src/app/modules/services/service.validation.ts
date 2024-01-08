import { z } from 'zod'
import { serviceCategories, serviceLocations } from './service.constants'

const createServiceZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    location: z.enum([...serviceLocations] as [string, ...string[]], {
      required_error: 'Location is required',
    }),
    category: z.enum([...serviceCategories] as [string, ...string[]], {
      required_error: 'Category is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    thumbnail: z.string({
      required_error: 'Thumbnail is required',
    }),
  }),
})
const updateServiceZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    price: z
      .number({
        required_error: 'Price is required',
      })
      .optional(),
    location: z
      .enum([...serviceLocations] as [string, ...string[]], {
        required_error: 'Location is required',
      })
      .optional(),
    category: z
      .enum([...serviceCategories] as [string, ...string[]], {
        required_error: 'Category is required',
      })
      .optional(),
    description: z.string({
      required_error: 'Description is required',
    }),
    thumbnail: z
      .string({
        required_error: 'Thumbnail is required',
      })
      .optional(),
  }),
})

export const ServiceValidations = {
  createServiceZodSchema,
  updateServiceZodSchema,
}
