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
import { defaultPagination } from '~/shared/lib/tanstack-query';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of users on the server.
 */
export const ssrFetchUsersList = cache(async (page: number = 1, size: number = 10) => {
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
 * @summary Fetches a list of users on the client.
 */
export async function fetchUsersList<QueryFunction>(
  queryContext: any
): Promise<Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1];
  const size = queryKey[2];
  try {
    const response = await UsersService.usersListApiV1UsersGet({ page, size });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching users list:', err.message);
    return defaultPagination;
  }
}

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

/**
 * @summary Fetches a user by ID on the client.
 */
export async function fetchUserById<QueryFunction>(
  queryContext: any
): Promise<UserReadAsAdmin | UserReadAsManager | UserRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const userId = queryKey[1];
  try {
    const response = await UsersService.usersReadApiV1UsersUserIdGet({ userId });
    return response;
  } catch (err: ApiError | Error | any) {
    logError('Error fetching user:', err.message);
    return undefined;
  }
}
