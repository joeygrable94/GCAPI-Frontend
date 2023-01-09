import { batch, createEffect, createResource, createSignal, onMount } from 'solid-js';
import { useNavigate } from 'solid-start';
import {
  AuthService,
  BearerResponse,
  Body_auth_access_api_v1_auth_access_post,
  UserRead,
  UsersService
} from '~/api';

import { g, log } from './utils';

export default function createAuthService(actions: any, state: any) {
  // auth login signal
  const [loggedIn, setLoggedIn] = createSignal(false);
  const navigate = useNavigate();

  // assign auth service actions
  Object.assign(actions, {
    // signal to fetch current user
    pullUser: () => setLoggedIn(true),
    // get the current user
    async fetchMe(d: any): Promise<boolean | UserRead> {
      try {
        const me: UserRead = await UsersService.usersAuthorizedApiV1UsersMeGet();
        return me;
      } catch (err: any) {
        log('Error actions.fetchMe()', err);
        batch(actions.resetToken);
        navigate('/login');
        return false;
      }
    },
    // login the current user
    async login(values: Body_auth_access_api_v1_auth_access_post): Promise<boolean> {
      try {
        const authBearer: BearerResponse =
          await AuthService.authAccessApiV1AuthAccessPost({ formData: values });
        actions.setToken(authBearer?.access_token, authBearer?.access_token_csrf);
        setLoggedIn(true);
        return true;
      } catch (err: any) {
        log('Error actions.login()', err);
        batch(actions.resetToken);
      }
      return false;
    },
    // logout the current user
    async logout(): Promise<boolean> {
      try {
        log('logout');
        await AuthService.authLogoutApiV1AuthLogoutDelete();
        return true;
      } catch (err: any) {
        log('Error actions.logout()', err);
      }
      batch(actions.resetState);
      return false;
    }
  });

  // auth server resource
  const [currentUser, { mutate, refetch }] = createResource(loggedIn, actions.fetchMe);

  onMount(() => {
    log('Mounted Auth Service');

    log('State Token:', state.token.split('.')[0]);
    log('State CSRF:', state.csrf);

    // load local auth
    // local token
    let localToken: string = '';
    if (g.localStorage.jwt) localToken = JSON.parse(g.localStorage.jwt);
    // local csrf
    let localCsrf: string = '';
    if (g.localStorage.csrf) localCsrf = JSON.parse(g.localStorage.csrf);

    log('Local Token [State]:', localToken.split('.')[0]);
    log('Local CSRF [State]:', localCsrf);

    // set initial state
    actions.setToken(localToken, localCsrf);

    log('State Token:', state.token.split('.')[0]);
    log('State CSRF:', state.csrf);
  });

  // common state changes
  createEffect(() => {
    log(`${state.appName} Auth Service State Changed`);

    // set local storage vars that changed
    if (state.token) g.localStorage.jwt = JSON.stringify(state.token);
    if (state.csrf) g.localStorage.csrf = JSON.stringify(state.csrf);

    log('State Token:', state.token.split('.')[0]);
    log('State CSRF:', state.csrf);
  });

  // return the fetchable resource
  return currentUser;
}
