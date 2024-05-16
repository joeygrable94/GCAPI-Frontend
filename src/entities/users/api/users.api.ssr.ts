import { cache, redirect } from '@solidjs/router';
import { AuthorizedUser, CurrentUser, defaultGuestUser } from '~/features/auth';
import { setOpenAPISessionToken } from '~/features/session';
import {
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserRead,
  UserReadAsAdmin,
  UserReadAsManager,
  UsersService
} from '~/shared/api';
import { log, logError } from '~/shared/utils';

/**
 * @summary Fetches the current user or redirects to login page
 */
export const getCurrentUserOrLogin = cache(async () => {
  'use server';
  let currentUser: AuthorizedUser;
  try {
    await setOpenAPISessionToken();
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: Error | any) {
    logError('Error fetching current user:', err.message);
    throw redirect('/login');
  }
  return currentUser as AuthorizedUser;
}, 'currentUserOrLogin');

/**
 * @summary Fetches the current user or guest on the server.
 */
export const getCurrentUserOrGuest = cache(async () => {
  'use server';
  let currentUser: CurrentUser = defaultGuestUser;
  if (import.meta.env.VITE_DEBUG === 'true') log('Fetching current user or guest');
  try {
    await setOpenAPISessionToken();
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: Error | any) {
    logError('No user currently logged in:', err.message);
  }
  return currentUser;
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
    users = await UsersService.usersListApiV1UsersGet({
      page: page,
      size: size
    });
  } catch (err: Error | any) {
    logError('Error fetching users list:', err.message);
  }
  return users;
}, 'ssrFetchUsersList');

/**
 * @summary Fetches a user by ID on the server.
 */
export const ssrFetchUserById = cache(async (id: string) => {
  'use server';
  let user: UserReadAsAdmin | UserReadAsManager | UserRead;
  try {
    user = await UsersService.usersReadApiV1UsersUserIdGet({ userId: id });
  } catch (err: Error | any) {
    logError('Error fetching user:', err.message);
    throw redirect('/404');
  }
  return user;
}, 'ssrFetchUserById');
