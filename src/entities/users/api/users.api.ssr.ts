import { cache } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import {
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserRead,
  UserReadAsAdmin,
  UserReadAsManager,
  UsersService
} from '~/shared/api';
import { logError, setOpenApiToken } from '~/shared/utils';

/**
 * @summary Fetches the current user or redirects to login page
 */
export const ssrFetchCurrentUser = cache(async () => {
  'use server';
  try {
    const event = getRequestEvent();
    setOpenApiToken('server', event?.locals.accessToken);
    return await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: Error | unknown) {
    logError('Error fetching current user:', err);
    return undefined;
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
    const event = getRequestEvent();
    setOpenApiToken('server', event?.locals.accessToken);
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
    const event = getRequestEvent();
    setOpenApiToken('server', event?.locals.accessToken);
    user = await UsersService.usersReadApiV1UsersUserIdGet({ userId: id });
  } catch (err: Error | unknown) {
    logError('Error fetching user:', err);
  }
  return user;
}, 'ssrFetchUserById');
