import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { ApiError, OpenAPI, UsersService } from '~/backend';
import { error } from '~/utils';
import { defaultAuthConfig, defaultGuestUser } from './constants';
import { AuthConfig, CurrentUser, GuestUser } from './types';

export const getCurrentUserOrGuest = cache(async () => {
  'use server';
  let currentUser: CurrentUser | GuestUser = defaultGuestUser;
  try {
    const cookie = getCookie(getRequestEvent()!, 'gcapi_auth');
    const parsed = JSON.parse(
      cookie ?? JSON.stringify(defaultAuthConfig)
    ) as AuthConfig;
    OpenAPI.TOKEN = parsed.accessToken;
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: ApiError | Error | any) {
    error('No user currently logged in:', err.message);
  }
  return currentUser;
}, 'currentUser');

export const getCurrentUser = cache(async () => {
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
    error('Error fetching current user:', err.message);
    throw redirect('/login');
  }
  return currentUser;
}, 'currentUser');
