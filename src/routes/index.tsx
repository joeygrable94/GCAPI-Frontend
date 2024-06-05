import { createSession } from '@solid-mediakit/auth/client';
import { createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { getUserSessionOrLogin } from '~/providers/auth';

export const route = {
  load: () => getUserSessionOrLogin()
};

export default function Home() {
  const session = createAsync(() => getUserSessionOrLogin());
  const auth = createSession();
  return (
    <main>
      <Show when={session() || auth()} fallback={<p>You are not signed in.</p>} keyed>
        {(session) => {
          return <h1>Welcome {session.user?.email}</h1>;
        }}
      </Show>
    </main>
  );
}
