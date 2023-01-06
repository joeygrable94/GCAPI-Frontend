import { Show } from 'solid-js';
import { A, useRouteData } from 'solid-start';
import {
  createServerAction$,
  createServerData$,
  redirect
} from 'solid-start/server';
import { getUser, logoutUser } from '~/lib/db/session';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request);
    if (!user) throw redirect('/login');
    return { user };
  });
}

export default function Navigation(props: any) {
  const data = useRouteData<typeof routeData>();
  const [, { Form }] = createServerAction$(
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
        <Form>
          <button name="logout" type="submit">
            Logout
          </button>
        </Form>
      </Show>
    </nav>
  );
}
