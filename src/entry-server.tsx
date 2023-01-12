import { redirect } from 'solid-start';
import { createHandler, renderAsync, StartServer } from 'solid-start/entry-server';
import { AuthorizedHeader, CheckAuthorized } from '~/lib/auth/types';
import {
  destroyAuthorizedSession,
  determineAuthorized,
  getCheckAuthorized,
  isAuthorized
} from '~/lib/auth/utilities';
import { globMatch, log } from '~/lib/core/utils';

const protectedPaths: string[] = ['users', 'users/*-*-*-*-*'];
const belongsToOrSuperUser: string[] = ['users/*-*-*-*-*'];

export default createHandler(
  ({ forward }: any) => {
    return async (event) => {
      const authorized: CheckAuthorized = await getCheckAuthorized(event.request);
      const url: URL = new URL(event.request.url);
      const reqPath: string[] = url.pathname.split('/').filter((e) => e.length > 0);
      const checkPath: string = reqPath.join('/');
      const isAuth: boolean = determineAuthorized(authorized);
      log('server auth state', authorized.user?.email);
      // authorized user or login
      if (reqPath.includes('login')) {
        if (isAuth) return redirect('/');
      } else {
        if (!isAuth) {
          const unauthHeader: AuthorizedHeader = await destroyAuthorizedSession(
            event.request
          );
          return redirect('/login', unauthHeader);
        }
      }
      // authorized superusers
      if (protectedPaths.includes(checkPath)) {
        log('verify super users only');
        if (isAuthorized(authorized) && !authorized?.user.is_superuser) {
          return redirect('/login', await destroyAuthorizedSession(event.request));
        }
      }
      // authorized superusers
      for (let path of protectedPaths) {
        if (globMatch(path, checkPath)) {
          if (isAuthorized(authorized) && !authorized?.user.is_superuser) {
            return redirect('/login', await destroyAuthorizedSession(event.request));
          }
        }
      }
      // TODO: edit the backend to allow returning different data based on user scopes
      // authorized superusers or belongs to user
      // for (let path of belongsToOrSuperUser) {
      //   if (globMatch(path, checkPath)) {
      //     log('verify user is superuser or belongs to user');
      //     if (!authorized?.user.is_superuser && authorized?.user.id !== reqPath[1]) {
      //       return redirect('/');
      //     }
      //   }
      // }
      // continue request
      return forward(event);
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);
