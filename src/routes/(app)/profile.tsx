import { Resource, Show } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { useAuthorizedContext } from '~/lib/auth/context';
import { CheckAuthorized } from '~/lib/auth/types';
import {
  initialRouteAuthState,
  returnAuthorizedUserOrRedirect
} from '~/lib/auth/useAuth';
import ProfileInfo from '~/lib/components/Profile';
import { log } from '~/lib/core/utils';

export function routeData() {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    returnAuthorizedUserOrRedirect,
    { initialValue: initialRouteAuthState }
  );
  return { authorized };
}

export default function UserProfileMain() {
  const { authorized }: any = useRouteData<typeof routeData>();
  const [auth, _] = useAuthorizedContext();

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<UserProfileMain>');
  return (
    <>
      <Title>User Profile</Title>
      <main>
        <h1>Current User Profile</h1>
        <Show when={authorized().user}>
          <ProfileInfo user={authorized().user} />
        </Show>
      </main>
    </>
  );
}
