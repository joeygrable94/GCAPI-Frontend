import { Component, Show } from 'solid-js';
import { useAuth0 } from '~/components';

const Home: Component = () => {
  const [authState, authAct] = useAuth0();
  return (
    <main>
      <h1>GCAPI Auth0 Secured Backend</h1>
      <Show when={authAct.isAuthenticated()}>
        <p>Welcome to your dashboard {authState.accessToken}.</p>
      </Show>
    </main>
  );
};

export default Home;
