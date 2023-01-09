import { createComputed, onMount, Resource, Show } from 'solid-js';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { Authorized } from '~/lib/auth/session';
import { getAuthorized } from '~/lib/auth/useUser';
import Navigation from '~/lib/components/Navigation';
import { useStore } from '~/lib/core/state';
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

export default function HomeLayout(props: any) {
  const { authorized }: any = useRouteData<typeof routeData>();
  const [state, actions]: any = useStore();
  onMount(() => {
    log('Mounted Home Layout');
    // load authorized user token + csrf
    if (authorized()?.access) {
      log('Set token from Home Route Data', authorized()?.access.csrf);
      actions.setToken(authorized()?.access.token, authorized()?.access.csrf);
    }
    // check state token
    if (!state.token) actions.setLoadState(true);
    else {
      // fetch current user
      actions.pullUser();
      createComputed(() => state.currentUser && actions.setLoadState(true));
    }
  });

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<HomeLayout>');
  return (
    <>
      <Show when={authorized()} fallback={<Navigation />}>
        <Navigation user={authorized()?.user} />
      </Show>
      <Outlet />
    </>
  );
}
