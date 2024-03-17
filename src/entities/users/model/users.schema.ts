import { z } from 'zod';

export const SchemaEditUser = z.object({
  userId: z.string({ required_error: 'Please enter a user ID.' }),
  username: z.string().nullable(),
  picture: z.string().nullable()
});

export type SEditUser = z.infer<typeof SchemaEditUser>;
