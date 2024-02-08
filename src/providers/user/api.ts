import { cache, redirect } from '@solidjs/router';
import {} from 'vinxi/server';
import { AuthorizedUser, CurrentUser, defaultGuestUser } from '~/providers/auth';
import { ApiError, UsersService } from '~/shared/api';
import { logError } from '~/shared/utils';

export const getCurrentUserOrGuest = cache(async () => {
  'use server';
  let currentUser: CurrentUser = defaultGuestUser;
  try {
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
    currentUser = await UsersService.usersCurrentApiV1UsersMeGet();
  } catch (err: ApiError | Error | any) {
    logError('Error fetching current user:', err.message);
    throw redirect('/login');
  }
  return currentUser as AuthorizedUser;
}, 'currentUserOrLogin');
