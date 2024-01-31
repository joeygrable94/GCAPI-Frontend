import { cache } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import {
  ApiError,
  OpenAPI,
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UsersService
} from '~/backend';
import { AuthConfig, defaultAuthConfig } from '~/components';
import { error } from '~/utils';

export const listUsers = cache(async (page: number = 1, size: number = 10) => {
  'use server';
  let users: Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_ = {
    total: 0,
    page: page,
    size: size,
    results: []
  };
  try {
    const cookie = getCookie(getRequestEvent()!, 'gcapi_auth');
    const parsed = JSON.parse(
      cookie ?? JSON.stringify(defaultAuthConfig)
    ) as AuthConfig;
    OpenAPI.TOKEN = parsed.accessToken;
    users = await UsersService.usersListApiV1UsersGet({
      page: page,
      size: size
    });
  } catch (err: ApiError | Error | any) {
    error('Error fetching users list:', err.message);
  }
  return users;
}, 'listUsers');
