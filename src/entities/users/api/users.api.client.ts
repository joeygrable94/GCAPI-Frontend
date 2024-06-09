import { QueryFunctionContext } from '@tanstack/solid-query';
import {
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserRead,
  UserReadAsAdmin,
  UserReadAsManager,
  UsersService
} from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches the current user or guest on the client.
 */
export async function fetchCurrentUserOrLogin(
  queryContext: QueryFunctionContext
): Promise<UserReadAsAdmin | UserReadAsManager | UserRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0] as string;
  try {
    const currentUser: UserReadAsAdmin | UserReadAsManager | UserRead =
      await UsersService.usersCurrentApiV1UsersMeGet();
    return currentUser;
  } catch (err: Error | unknown) {
    logError('Error fetching current user:', _key, err);
    return undefined;
  }
}

/**
 * @summary Fetches a list of users on the client.
 */
export async function fetchUsersList(
  queryContext: QueryFunctionContext
): Promise<Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0] as string;
  const page = queryKey[1] as number;
  const size = queryKey[2] as number;
  try {
    const response = await UsersService.usersListApiV1UsersGet({ page, size });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching users list:', _key, err);
    return defaultPagination<Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_>(
      page,
      size
    );
  }
}

/**
 * @summary Fetches a user by ID on the client.
 */
export async function fetchUserById(
  queryContext: QueryFunctionContext
): Promise<UserReadAsAdmin | UserReadAsManager | UserRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0] as string;
  const userId = queryKey[1] as string;
  try {
    const response = await UsersService.usersReadApiV1UsersUserIdGet({ userId });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching user:', _key, err);
    return undefined;
  }
}
