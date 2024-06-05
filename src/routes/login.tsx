import { createSession } from '@solid-mediakit/auth/client';
import { Navigate } from '@solidjs/router';
import { Show } from 'solid-js';

export default function Login() {
  const session = createSession();
  return (
    <main>
      <Show when={session()} fallback={<p>Please sign in or sign up.</p>}>
        <Navigate href="/" />
      </Show>
    </main>
  );
}
