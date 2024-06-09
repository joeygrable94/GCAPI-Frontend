import { createSession } from '@solid-mediakit/auth/client';
import { Show } from 'solid-js';

export default function Home() {
  const session = createSession();
  return (
    <main>
      <Show when={session()} fallback={<p>Please sign in or sign up.</p>} keyed>
        {(session) => {
          return <h1>Welcome {session.user?.email}</h1>;
        }}
      </Show>
    </main>
  );
}
