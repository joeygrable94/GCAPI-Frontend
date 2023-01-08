import { redirect } from 'solid-start';
import { createHandler, renderAsync, StartServer } from 'solid-start/entry-server';
import { Authorized, getCurrentUser, resetUserHeaders } from '~/lib/auth/session';
import { globMatch, log } from './lib/core/utils';

const protectedPaths: string[] = ['users'];
const belongsToOrSuperUser: string[] = ['users/*-*-*-*-*'];

export default createHandler(
  ({ forward }: any) => {
    return async (event) => {
      const authorized: Authorized | null = await getCurrentUser(event.request);
      const url: URL = new URL(event.request.url);
      const reqPath: string[] = url.pathname.split('/').filter((e) => e.length > 0);
      const checkPath: string = reqPath.join('/');
      // authorized user or login
      if (reqPath.includes('login')) {
        if (authorized) return redirect('/');
      } else {
        if (!authorized) {
          return redirect('/login', await resetUserHeaders(event.request));
        }
      }
      // authorized superusers
      if (protectedPaths.includes(checkPath)) {
        log('verify super users only');
        if (!authorized?.user.is_superuser) {
          return redirect('/login', await resetUserHeaders(event.request));
        }
      }
      // authorized superusers or belongs to user
      for (let path of belongsToOrSuperUser) {
        if (globMatch(path, checkPath)) {
          log('verify user is superuser or belongs to user');
          if (!authorized?.user.is_superuser && authorized?.user.id !== reqPath[1]) {
            return redirect('/');
          }
        }
      }
      // debug
      if (import.meta.env.DEV) log('authorized user', authorized?.user.email);
      // continue request
      return forward(event);
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
