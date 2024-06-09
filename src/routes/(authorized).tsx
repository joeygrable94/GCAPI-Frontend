import { createSession } from '@solid-mediakit/auth/client';
import { RouteSectionProps } from '@solidjs/router';
import { Show } from 'solid-js';

export default function Authorzied(props: RouteSectionProps) {
  const auth = createSession();
  return (
    <Show when={auth()} fallback={<p>You are not signed in.</p>}>
      {props.children}
    </Show>
  );
}
