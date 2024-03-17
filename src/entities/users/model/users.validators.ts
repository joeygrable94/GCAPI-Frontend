import { z } from 'zod';

export const IsValidUserPicture = z
  .string()
  .max(1024, 'the picture url must be 1024 characters or less');

export const IsValidUserUsername = z
  .string()
  .min(5, 'the username must be 5 characters or more')
  .max(255, 'the username must be 255 characters or less');
