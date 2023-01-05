import { Show } from 'solid-js';
import { A, useRouteData } from 'solid-start';
import { createServerAction$, createServerData$ } from 'solid-start/server';
import { logoutUser } from '~/lib/db/session';
import { checkUserPermissionsOrRedirect } from '~/lib/db/useUser';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await checkUserPermissionsOrRedirect(request);
    return { user };
  });
}

export default function Navigation(props: any) {
  const data: any = useRouteData<typeof routeData>();
  const [, { Form }] = createServerAction$(
    async (f: FormData, { request }) => await logoutUser(request)
  );

  return (
    <>
      <A href="/">Index</A>
      <Show when={data()?.user} fallback={<A href="/login">Login</A>}>
        <Show when={data()?.user.is_superuser}>
          <A href="/users">Users</A>
        </Show>
        <A href="/users/me">My Account</A>
        <Form>
          <button name="logout" type="submit">
            Logout
          </button>
        </Form>
      </Show>
    </>
  );
}
