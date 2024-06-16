import { Session, getSession } from '@solid-mediakit/auth';
import { cache, redirect } from '@solidjs/router';
import { getRequestEvent } from 'solid-js/web';
import { logError, setOpenApiToken } from '~/shared/utils';
import { authOptions } from './auth.config';

export const getUserSessionOrLogin = cache(async () => {
  'use server';
  try {
    const event = getRequestEvent();
    if (event === undefined) throw new Error('Event is undefined');
    const session = await getSession(event.request, authOptions);
    if (!session) throw redirect('/login');
    if (session.accessToken !== undefined)
      setOpenApiToken('server', session.accessToken);
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
    const event = getRequestEvent();
    if (event === undefined) throw new Error('Event is undefined');
    const session = await getSession(event.request, authOptions);
    if (!session) return defaultSession;
    if (session.accessToken !== undefined)
      setOpenApiToken('server', session.accessToken);
    return session;
  } catch (error) {
    logError(error);
    return defaultSession;
  }
}, 'userSessionApiToken');
