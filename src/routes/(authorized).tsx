import { createSession } from '@solid-mediakit/auth/client';
import { RouteSectionProps, createAsync } from '@solidjs/router';
import { Show } from 'solid-js';
import { getUserSessionOrLogin } from '~/providers/auth';

export const route = {
  load: () => getUserSessionOrLogin()
};

export default function Authorzied(props: RouteSectionProps) {
  const session = createAsync(() => getUserSessionOrLogin());
  const auth = createSession();
  return (
    <Show when={session() || auth()} fallback={<p>You are not signed in.</p>}>
      {props.children}
    </Show>
  );
}
