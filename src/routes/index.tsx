import { RouteDefinition, createAsync } from '@solidjs/router';
import { Component } from 'solid-js';
import { CurrentUser, getCurrentUser } from '~/components';

export const route = {
  load: () => getCurrentUser()
} satisfies RouteDefinition;

const Home: Component = () => {
  const data = createAsync<CurrentUser>(getCurrentUser);
  return (
    <main>
      <h1>GCAPI Auth0 Secured Backend</h1>
      {data() && <p>Welcome {data()?.username}.</p>}
    </main>
  );
};

export default Home;
