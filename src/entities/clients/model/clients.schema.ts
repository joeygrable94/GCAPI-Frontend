import { z } from 'zod';

export const SchemaCreateClient = z.object({
  title: z.string({ required_error: 'Please enter a name.' }),
  description: z.string().nullable(),
  is_active: z.boolean()
});

export type SCreateClient = z.infer<typeof SchemaCreateClient>;

export const SchemaEditClient = z.object({
  clientId: z.string({ required_error: 'Please enter a client ID.' }),
  title: z.string().nullable(),
  description: z.string().nullable(),
  is_active: z.boolean().nullable()
});

export type SEditClient = z.infer<typeof SchemaEditClient>;
