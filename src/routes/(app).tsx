import { Container } from '@hope-ui/core';
import { createComputed, createEffect, onMount, Resource, Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { AuthorizedProvider, useAuthorizedContext } from '~/lib/auth/context';
import { CheckAuthorized } from '~/lib/auth/types';
import { getCheckAuthorized } from '~/lib/auth/utilities';
import Navigation from '~/lib/components/Navigation';
import { log } from '~/lib/core/utils';

export function routeData() {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    async (_, { request }) => {
      const authorized: CheckAuthorized = await getCheckAuthorized(request);
      return authorized;
    },
    {
      initialValue: { user: false, access: false }
    }
  );
  return { authorized };
}

export default function HomeLayout(props: any) {
  const { authorized }: { authorized: Resource<CheckAuthorized> } =
    useRouteData<typeof routeData>();
  const [auth, { pullUser, setToken, setAuthLoad }] = useAuthorizedContext();

  const testAuthState = () => {
    isServer ? log('auth state [SERVER]') : log('auth state [CLIENT]');
  };
  testAuthState();

  onMount(() => {
    // load authorized user token + csrf to client from SSR
    if (authorized()?.access)
      setToken(authorized()?.access.token, authorized()?.access.csrf);
  });

  // common state changes
  createEffect(() => {
    // check state token
    if (!auth.token) setAuthLoad(true);
    else {
      // fetch current user
      pullUser();
      createComputed(() => auth.currentUser && setAuthLoad(true));
    }
  });

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<HomeLayout>');
  return (
    <>
      <AuthorizedProvider
        token={authorized()?.access ? authorized()?.access?.token : ''}
        csrf={authorized()?.access ? authorized()?.access?.csrf : ''}
      >
        <Show when={authorized()} fallback={<Navigation user={false} />}>
          <Navigation user={authorized()?.user} />
        </Show>
        <Container>
          <Outlet />
        </Container>
      </AuthorizedProvider>
    </>
  );
}
