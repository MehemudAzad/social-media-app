import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    role: z.enum(['admin', 'user']),
    password: z.string().min(6), // assuming a minimum password length of 6 characters
    phone: z.string(), // additional phone format validation can be added if needed
    address: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
};
