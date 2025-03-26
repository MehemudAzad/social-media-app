import { z } from 'zod';

const createbookingValidationSchema = z.object({
  body: z.object({
    car: z.string({
      invalid_type_error: ' Car must be string',
      required_error: 'Car is required',
    }),
    date: z.string(), // Assuming ObjectId is represented as a non-empty string
    startTime: z.string(),
    totalCost: z.number().nonnegative().default(0),
  }),
});

export const BookingValidations = {
  createbookingValidationSchema,
};
