import {
  ApiError,
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
    return defaultPagination<Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_>(
      page,
      size
    );
  }
}

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
