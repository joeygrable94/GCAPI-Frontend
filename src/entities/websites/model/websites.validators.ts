import { z } from 'zod';

export const IsValidWebsiteDomain = z
  .string({ required_error: 'Website domain is required' })
  .min(5, 'the domain must be 5 characters or more')
  .max(255, 'the domain must be 255 characters or less');

export const IsValidWebsiteIsActive = z.boolean({
  required_error: 'Website active status is required'
});

export const IsValidWebsiteIsSecure = z.boolean({
  required_error: 'Website secure status is required'
});
