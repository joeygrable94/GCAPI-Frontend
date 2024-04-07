import { cache, redirect } from '@solidjs/router';
import { AuthorizedUser, CurrentUser, defaultGuestUser } from '~/features/auth';
import { setOpenAPISessionToken } from '~/features/session';
import { ApiError, UsersService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

export const getCurrentUserOrGuest = cache(async () => {
  'use server';
  let currentUser: CurrentUser = defaultGuestUser;
  if (import.meta.env.VITE_DEBUG === 'true') log('Fetching current user or guest');
  try {
    await setOpenAPISessionToken();
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
    await setOpenAPISessionToken();
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: ApiError | Error | any) {
    logError('Error fetching current user:', err.message);
    throw redirect('/login');
  }
  return currentUser as AuthorizedUser;
}, 'currentUserOrLogin');
