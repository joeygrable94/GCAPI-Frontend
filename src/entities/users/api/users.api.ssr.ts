import { cache, redirect } from '@solidjs/router';
import {
  ApiError,
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserRead,
  UserReadAsAdmin,
  UserReadAsManager,
  UsersService
} from '~/shared/api';
import { logError } from '~/shared/utils';

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
  } catch (err: ApiError | Error | any) {
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
  } catch (err: ApiError | Error | any) {
    logError('Error fetching user:', err.message);
    throw redirect('/404');
  }
  return user;
}, 'ssrFetchUserById');
