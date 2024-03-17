import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { parseCookies } from 'vinxi/http';
import {
  AuthConfig,
  AuthorizedUser,
  CurrentUser,
  defaultAuthConfig,
  defaultGuestUser
} from '~/features/auth';
import { ApiError, OpenAPI, UsersService } from '~/shared/api';
import { logError } from '~/shared/utils';

export const getCurrentUserOrGuest = cache(async () => {
  'use server';
  let currentUser: CurrentUser = defaultGuestUser;
  try {
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    const parsed: AuthConfig = cookies['gcapi_auth']
      ? JSON.parse(cookies['gcapi_auth'])
      : defaultAuthConfig;
    OpenAPI.TOKEN = await parsed.accessToken;
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
    const event = getRequestEvent();
    const cookies = parseCookies(event!);
    const parsed: AuthConfig = cookies['gcapi_auth']
      ? JSON.parse(cookies['gcapi_auth'])
      : defaultAuthConfig;
    OpenAPI.TOKEN = await parsed.accessToken;
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: ApiError | Error | any) {
    logError('Error fetching current user:', err.message);
    throw redirect('/login');
  }
  return currentUser as AuthorizedUser;
}, 'currentUserOrLogin');
