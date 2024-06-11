import { createSession } from '@solid-mediakit/auth/client';
import { RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { Show } from 'solid-js';
import { isServer } from 'solid-js/web';
import { getUserSessionApiToken } from '~/providers/auth';
import { setOpenApiToken } from '~/shared/utils';

export const route = {
  async load() {
    const session = await getUserSessionApiToken();
    setOpenApiToken(isServer ? 'server' : 'client', session.accessToken ?? '');
    return session;
  }
} satisfies RouteDefinition;

export default function UsersLayout(props: RouteSectionProps) {
  const auth = createSession();

  return (
    <Show when={auth()} fallback={<p>You are not signed in.</p>}>
      {props.children}
    </Show>
  );
}
