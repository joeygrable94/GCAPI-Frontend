import { Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';
import { logoutUser } from '~/lib/auth/session';
import ToggleColorMode from '~/lib/components/ToggleColorMode';
import { useStore } from '~/lib/core/state';

export default function Navigation(props: any) {
  const [state, actions]: any = useStore();
  const [loggingOut, logout] = createServerAction$(
    async (f: FormData, { request }) => await logoutUser(request)
  );

  return (
    <>
      <nav>
        <A href="/">Index</A>
        {/* Login */}
        <Show when={props?.user} fallback={<A href="/login">Login</A>}>
          {/* User Links */}
          <A href="/profile">My Account</A>
          {/* SuperUser Links */}
          <Show when={props?.user?.is_superuser}>
            <A href="/users">Users</A>
          </Show>
          {/* Logout */}
          <logout.Form>
            <button name="logout" type="submit">
              Logout
            </button>
          </logout.Form>
        </Show>
      </nav>
      <ToggleColorMode />
    </>
  );
}
