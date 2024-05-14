import { z } from 'zod';

export const IsValidClientTitle = z
  .string({ required_error: 'Client title is required' })
  .min(5, 'the title must be 5 characters or more')
  .max(255, 'the title must be 255 characters or less');

export const IsValidClientDescription = z
  .string({ required_error: 'Client description is required' })
  .max(5000, 'the description must 5000 characters or less')
  .optional();

export const IsValidClientIsActive = z.boolean({
  required_error: 'Client status is required'
});
