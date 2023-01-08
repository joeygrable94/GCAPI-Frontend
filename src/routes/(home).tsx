import { onMount, Resource } from 'solid-js';
import { Outlet, useRouteData } from 'solid-start';
import { createServerData$, redirect } from 'solid-start/server';
import { Authorized, getUser } from '~/lib/auth/session';
import Navigation from '~/lib/components/Navigation';
import { useStore } from '~/lib/core/state';
import { log } from '~/lib/core/utils';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const authorized: Authorized | null = await getUser(request);
    if (!authorized) throw redirect('/login');
    return authorized;
  });
}

export default function HomeLayout(props: any) {
  const data: Resource<Authorized | undefined> =
    useRouteData<typeof routeData>();
  const [, { setToken, setTokenCSRF }]: any = useStore();
  onMount(() => {
    // load authorized user token + csrf
    if (data()?.token) setToken(data()?.token);
    if (data()?.csrf) setTokenCSRF(data()?.csrf);
  });

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<HomeLayout>');
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
