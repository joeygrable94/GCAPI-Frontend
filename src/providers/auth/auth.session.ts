import { Session, getSession as getAuthSession } from '@solid-mediakit/auth';
import { cache, redirect } from '@solidjs/router';
import { getWebRequest } from 'vinxi/http';
import { OpenAPI } from '~/shared/api';
import { logError } from '~/shared/utils';
import { authOptions } from './auth.config';

export const getUserSessionOrLogin = cache(async () => {
  'use server';
  try {
    const request = getWebRequest();
    const session = await getAuthSession(request, authOptions);
    if (!session) throw redirect('/login');
    OpenAPI.TOKEN = session.accessToken;
    return session;
  } catch (error) {
    OpenAPI.TOKEN = '';
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
    OpenAPI.TOKEN = session.accessToken;
    return session;
  } catch (error) {
    logError(error);
    return defaultSession;
  }
}, 'userSessionApiToken');
