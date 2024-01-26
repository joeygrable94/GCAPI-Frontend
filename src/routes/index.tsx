import { createAsync, type RouteDefinition } from '@solidjs/router';
import { Component, ErrorBoundary, Show } from 'solid-js';
import { useAuth0 } from '~/components';
import { getUser } from '~/server/session';

export const route = {
  load: () => getUser()
} satisfies RouteDefinition;

const Home: Component = () => {
  const user = createAsync(getUser, { deferStream: true });
  const [authState, authAct] = useAuth0();
  return (
    <main>
      <h1>GCAPI Auth0 Secured Backend</h1>
      <p>Welcome to your dashboard {authState.email}.</p>
      <ErrorBoundary fallback={<>SSR Fetch Error</>}>
        <Show when={user()}>
          <p>
            SSR: {user()?.id} {user()?.email}.
          </p>
        </Show>
      </ErrorBoundary>
    </main>
  );
};

export default Home;
