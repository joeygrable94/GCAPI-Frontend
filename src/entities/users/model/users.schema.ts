import * as v from 'valibot';
import { IsValidUserId, IsValidUserPicture, IsValidUsername } from '~/shared/db';

export const SchemaEditUser = v.object({
  userId: IsValidUserId,
  username: IsValidUsername,
  picture: IsValidUserPicture
});

export type SEditUser = v.InferInput<typeof SchemaEditUser>;
