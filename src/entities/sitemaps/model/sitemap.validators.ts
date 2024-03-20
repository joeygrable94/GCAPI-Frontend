import { z } from 'zod';

export const IsValidWebsiteSitemapUrl = z
  .string({ required_error: 'Sitemap URL is required' })
  .min(1, 'the URL must be 1 characters or more')
  .max(2048, 'the URL must be 2048 characters or less');

export const IsValidWebsiteSitemapIsActive = z.boolean({
  required_error: 'Website sitemap active status is required'
});
