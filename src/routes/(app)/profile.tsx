import { Resource, Show } from 'solid-js';
import { Title, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { CheckAuthorized } from '~/lib/auth/types';
import { getAuthorized } from '~/lib/auth/useAuth';
import ProfileInfo from '~/lib/components/Profile';
import { log } from '~/lib/core/utils';

export function routeData() {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    async (_, { request }) => {
      const authorized: CheckAuthorized = await getAuthorized(request);
      if (!authorized?.user) throw redirect('/login');
      return authorized;
    },
    {
      initialValue: { user: false, access: false }
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
