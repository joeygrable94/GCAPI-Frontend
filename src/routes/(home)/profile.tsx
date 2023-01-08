import { Resource, Show } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { Authorized } from '~/lib/auth/session';
import { getAuthorized } from '~/lib/auth/useUser';
import ProfileInfo from '~/lib/components/Profile';
import { log } from '~/lib/core/utils';

export function routeData() {
  const authorized: Resource<Authorized | null> = createServerData$(
    async (_, { request }) => {
      const authorized: Authorized | null = await getAuthorized(request);
      if (!authorized) throw redirect('/login');
      return authorized;
    },
    {
      initialValue: null
    }
  );
  return { authorized };
}

export default function UserProfileMain() {
  const { authorized }: any = useRouteData<typeof routeData>();

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<UserProfileMain>');
  return (
    <>
      <Title>User Profile</Title>
      <main>
        <h1>Current User Profile</h1>
        <Show when={authorized()?.user}>
          <ProfileInfo user={authorized().user} />
        </Show>
      </main>
    </>
  );
}
