import { Show } from 'solid-js';
import { A, useRouteData } from 'solid-start';
import {
  createServerAction$,
  createServerData$,
  redirect
} from 'solid-start/server';
import { Authorized, getUser, logoutUser } from '~/lib/auth/session';
import { useStore } from '~/lib/core/state';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const authorized: Authorized | null = await getUser(request);
    if (!authorized) throw redirect('/login');
    return authorized;
  });
}

export default function Navigation(props: any) {
  const data = useRouteData<typeof routeData>();
  const [state, actions]: any = useStore();
  const [loggingOut, logout] = createServerAction$(
    async (f: FormData, { request }) => await logoutUser(request)
  );

  return (
    <nav>
      <A href="/">Index</A>
      <Show when={data()?.user} fallback={<A href="/login">Login</A>}>
        <A href="/profile">My Account</A>
        <Show when={data()?.user?.is_superuser}>
          <A href="/users">Users</A>
        </Show>
        <logout.Form>
          <button name="logout" type="submit">
            Logout
          </button>
        </logout.Form>
      </Show>
    </nav>
  );
}
