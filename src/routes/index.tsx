import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component, Show } from 'solid-js';
import { CurrentUser } from '~/providers/auth';
import { getCurrentUserOrGuest } from '~/providers/user';

export const route = {
  load: () => getCurrentUserOrGuest()
} satisfies RouteDefinition;

const Home: Component = () => {
  const data = createAsync<CurrentUser>(getCurrentUserOrGuest);
  return (
    <main>
      <h1 class="my-2">GCAPI Auth0 Secured Backend</h1>
      <Show when={data()}>
        <p>Welcome {data()?.username}.</p>
      </Show>
    </main>
  );
};

export default Home;
