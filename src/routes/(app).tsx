import { Container } from '@hope-ui/core';
import { createComputed, createEffect, Resource } from 'solid-js';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { AuthorizedProvider, useAuthorizedContext } from '~/lib/auth/context';
import { CheckAuthorized } from '~/lib/auth/types';
import { initialRouteAuthState, returnAuthorizedUser } from '~/lib/auth/useAuth';
import Navigation from '~/lib/components/Navigation';
import { log } from '~/lib/core/utils';

export function routeData() {
  return createServerData$(returnAuthorizedUser, {
    initialValue: initialRouteAuthState
  });
}

export default function HomeLayout(props: any) {
  const authorized: Resource<CheckAuthorized> = useRouteData<typeof routeData>();

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<HomeLayout>');
  return (
    <>
      <AuthorizedProvider
        token={authorized()?.access?.token}
        csrf={authorized()?.access?.csrf}
      >
        <Navigation />
        <Container>
          <Outlet />
        </Container>
      </AuthorizedProvider>
    </>
  );
}
