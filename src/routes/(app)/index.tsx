import { onMount, Resource } from 'solid-js';
import { Navigate, Title, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { CheckAuthorized } from '~/lib/auth/types';
import {
  initialRouteAuthState,
  returnAuthorizedUserOrRedirectToLogin
} from '~/lib/auth/useAuth';
import Counter from '~/lib/components/Counter';
import { log } from '~/lib/core/utils';

export function routeData() {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    returnAuthorizedUserOrRedirectToLogin,
    { initialValue: initialRouteAuthState }
  );
  return { authorized };
}

export default function HomePage() {
  const { authorized }: any = useRouteData<typeof routeData>();

  onMount(() => {
    if (!authorized().user) return <Navigate href="/login" />;
  });

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<HomePage>');
  return (
    <>
      <Title>Home Page</Title>
      <main>
        <h1>Hello there!</h1>
        <h2>Welcome to GCAPI.</h2>
        <Counter />
      </main>
    </>
  );
}
