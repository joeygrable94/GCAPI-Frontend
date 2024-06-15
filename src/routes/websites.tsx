import { createSession } from '@solid-mediakit/auth/client';
import { RouteDefinition, RouteSectionProps } from '@solidjs/router';
import { Show, Suspense } from 'solid-js';
import { getUserSessionApiToken } from '~/providers/auth';

export const route = {
  async load() {
    const session = await getUserSessionApiToken();
    return session;
  }
} satisfies RouteDefinition;

export default function WebsitesLayout(props: RouteSectionProps) {
  const auth = createSession();

  return (
    <Show when={auth()} fallback={<p>You are not signed in.</p>}>
      <Suspense>{props.children}</Suspense>
    </Show>
  );
}
