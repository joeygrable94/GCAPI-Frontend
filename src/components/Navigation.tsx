import { Show } from 'solid-js';
import { A } from 'solid-start';
import { createServerAction$ } from 'solid-start/server';
import { logoutUser } from '~/core/session';

export default function Navigation(props: any) {
  const [, { Form }] = createServerAction$(
    async (f: FormData, { request }) => await logoutUser(request)
  );

  if (props.currentUser === undefined) {
    props.currentUser = () => false;
  }

  return (
    <>
      <A href="/">Index</A>
      <Show when={props.currentUser()} fallback={<A href="/login">Login</A>}>
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
