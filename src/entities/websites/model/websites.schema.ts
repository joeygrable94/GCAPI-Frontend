import { z } from 'zod';

export const SchemaCreateWebsite = z.object({
  domain: z.string({ required_error: 'Please enter a domain name.' }),
  is_secure: z.boolean(),
  is_active: z.boolean()
});

export type SCreateWebsite = z.infer<typeof SchemaCreateWebsite>;

export const SchemaEditWebsite = z.object({
  websiteId: z.string({ required_error: 'Please enter a website ID.' }),
  domain: z.string().nullable(),
  is_secure: z.boolean().nullable(),
  is_active: z.boolean().nullable()
});

export type SEditWebsite = z.infer<typeof SchemaEditWebsite>;
