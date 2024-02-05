import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import {
  AuthConfig,
  AuthorizedUser,
  CurrentUser,
  defaultAuthConfig,
  defaultGuestUser
} from '~/providers/auth';
import { ApiError, OpenAPI, UsersService } from '~/shared/api';
import { logError } from '~/shared/utils';

export const getCurrentUserOrGuest = cache(async () => {
  'use server';
  let currentUser: CurrentUser = defaultGuestUser;
  try {
    const cookie = getCookie(getRequestEvent()!, 'gcapi_auth');
    const parsed = JSON.parse(
      cookie ?? JSON.stringify(defaultAuthConfig)
    ) as AuthConfig;
    OpenAPI.TOKEN = parsed.accessToken;
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: ApiError | Error | any) {
    logError('No user currently logged in:', err.message);
  }
  return currentUser;
}, 'currentUser');

export const getCurrentUserOrLogin = cache(async () => {
  'use server';
  let currentUser: CurrentUser;
  try {
    const cookie = getCookie(getRequestEvent()!, 'gcapi_auth');
    const parsed = JSON.parse(
      cookie ?? JSON.stringify(defaultAuthConfig)
    ) as AuthConfig;
    OpenAPI.TOKEN = parsed.accessToken;
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: ApiError | Error | any) {
    logError('Error fetching current user:', err.message);
    throw redirect('/login');
  }
  return currentUser as AuthorizedUser;
}, 'currentUser');
