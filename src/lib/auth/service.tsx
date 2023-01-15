import {
  batch,
  createComputed,
  createEffect,
  createResource,
  createSignal,
  onMount
} from 'solid-js';
import { useNavigate } from 'solid-start';
import { OpenAPI, UserReadSafe, UsersService } from '~/api';

import { API_URL_BASE, log } from '~/lib/core/utils';

export default function createAuthService(actions: any, state: any, setState: any) {
  // auth login signal
  const [loggedIn, setLoggedIn] = createSignal(false);
  const navigate = useNavigate();

  // assign auth service actions
  Object.assign(actions, {
    // signal to fetch current user
    pullUser: () => setLoggedIn(true),
    // get the current user
    async fetchMe(d: any): Promise<boolean | UserReadSafe> {
      try {
        const me: UserReadSafe = await UsersService.usersCurrentUserApiV1UsersMeGet();
        return me;
      } catch (err: any) {
        if (import.meta.env.DEV) log('Error actions.fetchMe()', err);
        actions.resetToken();
        navigate('/login');
      }
      return false;
    }
  });

  // auth server resource
  const [currentUser, { mutate, refetch }] = createResource<boolean | UserReadSafe>(
    loggedIn,
    actions.fetchMe
  );

  onMount(() => {
    // set initial state
    actions.setApiBaseUrl(API_URL_BASE);
  });

  // watch auth state changes
  createEffect(() => {
    // check state token
    if (!state.token) actions.setAuthLoad(true);
    else {
      OpenAPI.TOKEN = state.token;
      // fetch current user
      actions.pullUser();
      createComputed(() => state.currentUser && actions.setAuthLoad(true));
    }
  });

  // return the fetchable resource
  return currentUser;
}
