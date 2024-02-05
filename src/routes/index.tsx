import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component } from 'solid-js';
import { CurrentUser } from '~/providers/auth';
import { getCurrentUserOrLogin } from '~/providers/user';

export const route = {
  load: () => getCurrentUserOrLogin()
} satisfies RouteDefinition;

const Home: Component = () => {
  const data = createAsync<CurrentUser>(getCurrentUserOrLogin);
  return (
    <main>
      <h1 class="my-2">GCAPI Auth0 Secured Backend</h1>
      {data() && <p>Welcome {data()?.username}.</p>}
    </main>
  );
};

export default Home;
