import { cache } from '@solidjs/router';
import { getUserSessionApiToken } from '~/providers/auth';
import {
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserRead,
  UserReadAsAdmin,
  UserReadAsManager,
  UsersService
} from '~/shared/api';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches the current user or redirects to login page
 */
export const ssrFetchCurrentUser = cache(async () => {
  'use server';
  try {
    await getUserSessionApiToken();
    const currentUser: UserReadAsAdmin | UserReadAsManager | UserRead =
      await UsersService.usersCurrentApiV1UsersMeGet();
    return currentUser;
  } catch (err: Error | unknown) {
    logError('Error fetching current user:', err);
    return { username: 'guest' };
  }
}, 'currentUser');

/**
 * @summary Fetches a list of users on the server.
 */
export const ssrFetchUsersList = cache(async (page: number, size: number) => {
  'use server';
  let users: Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_ = {
    total: 0,
    page: page,
    size: size,
    results: []
  };
  try {
    await getUserSessionApiToken();
    users = await UsersService.usersListApiV1UsersGet({
      page: page,
      size: size
    });
  } catch (err: Error | unknown) {
    logError('Error fetching users list:', err);
  }
  return users;
}, 'ssrFetchUsersList');

/**
 * @summary Fetches a user by ID on the server.
 */
export const ssrFetchUserById = cache(async (id: string) => {
  'use server';
  let user: UserReadAsAdmin | UserReadAsManager | UserRead | undefined = undefined;
  try {
    await getUserSessionApiToken();
    user = await UsersService.usersReadApiV1UsersUserIdGet({ userId: id });
  } catch (err: Error | unknown) {
    logError('Error fetching user:', err);
  }
  return user;
}, 'ssrFetchUserById');
