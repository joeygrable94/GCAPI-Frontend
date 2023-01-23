import {
  createComputed,
  createEffect,
  createResource,
  createSignal,
  onMount
} from 'solid-js';
import { ApiError, OpenAPI, UserAdmin, UserRead, UsersService } from '~/api';

import { API_URL_BASE, log } from '~/lib/core/utils';

export default function createAuthService(actions: any, state: any, setState: any) {
  const [loggedIn, setLoggedIn] = createSignal(false);

  const [currentUser, { mutate, refetch }] = createResource<
    boolean | UserAdmin | UserRead
  >(loggedIn, actions.fetchMe);

  Object.assign(actions, {
    pullUser: () => setLoggedIn(true),
    async fetchMe(d: any): Promise<boolean | UserAdmin | UserRead> {
      try {
        const me: UserAdmin | UserRead =
          await UsersService.usersCurrentUserApiV1UsersMeGet();
        return me;
      } catch (error: ApiError | any) {
        if (import.meta.env.DEV) log('Error actions.fetchMe()', error);
      }
      return false;
    }
  });

  onMount(() => {
    actions.setApiBaseUrl(API_URL_BASE);
  });

  createEffect(() => {
    if (!state.token) actions.setAuthLoad(true);
    else {
      OpenAPI.TOKEN = state.token;
      actions.pullUser();
      createComputed(() => state.currentUser && actions.setAuthLoad(true));
    }
  });

  return currentUser;
}
