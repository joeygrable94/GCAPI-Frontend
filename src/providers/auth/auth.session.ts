import { Session, getSession as getAuthSession } from '@solid-mediakit/auth';
import { cache, redirect } from '@solidjs/router';
import { getWebRequest } from 'vinxi/http';
import { logError } from '~/shared/utils';
import { authOptions } from './auth.config';

export const getUserSessionOrLogin = cache(async () => {
  'use server';
  try {
    const request = getWebRequest();
    const session = await getAuthSession(request, authOptions);
    if (!session) throw redirect('/login');
    return session;
  } catch (error) {
    logError(error);
  }
}, 'userSessionOrLogin');

export const getUserSessionApiToken = cache(async () => {
  'use server';
  const defaultSession = {
    accessToken: undefined,
    refreshToken: undefined,
    expires: ''
  } as Session;
  try {
    const request = getWebRequest();
    const session = await getAuthSession(request, authOptions);
    if (!session) return defaultSession;
    return session;
  } catch (error) {
    logError(error);
    return defaultSession;
  }
}, 'userSessionApiToken');
