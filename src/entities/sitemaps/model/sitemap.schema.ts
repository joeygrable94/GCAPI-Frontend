import { z } from 'zod';

export const SchemaCreateWebsiteSitemap = z.object({
  url: z.string({ required_error: 'Please enter a URL.' }),
  is_active: z.boolean({ required_error: 'Please enter an active status.' }),
  website_id: z.string({ required_error: 'Please enter a website ID.' })
});

export type SCreateWebsiteSitemap = z.infer<typeof SchemaCreateWebsiteSitemap>;

export const SchemaEditWebsiteSitemap = z.object({
  sitemapId: z.string({ required_error: 'Please enter a sitemap ID.' }),
  url: z.string().nullable(),
  is_active: z.boolean().nullable()
});

export type SEditWebsiteSitemap = z.infer<typeof SchemaEditWebsiteSitemap>;
