import { Component } from 'solid-js';
import { useAuth0 } from '~/components';

const Home: Component = () => {
  const [authState, authAct] = useAuth0();
  return (
    <main>
      <h1>GCAPI Auth0 Secured Backend</h1>
      <p>Welcome to your dashboard {authState.email}.</p>
    </main>
  );
};

export default Home;
