import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { CurrentUser } from '~/features/auth';
import { getCurrentUserOrGuest } from '~/features/user';

export const route = {
  load: () => getCurrentUserOrGuest()
} satisfies RouteDefinition;

const Home: Component = () => {
  const user = createAsync<CurrentUser>(() => getCurrentUserOrGuest());

  return (
    <main>
      <h1 class="my-2">GCAPI Auth0 Secured Backend</h1>
      <Show when={user()}>
        <p>Welcome {user()?.username}.</p>
      </Show>
    </main>
  );
};

export default Home;
