import { Title } from '@solidjs/meta';
import { Component, onMount } from 'solid-js';
import { Counter, useAuth } from '~/features';
import { log } from '~/utilities';

const Home: Component = () => {
  const [state, setState] = useAuth();
  onMount(() => {
    log('Home', state.user);
  });
  return (
    <>
      <Title>GCAPI Solid JS</Title>
      <main>
        <h1>SolidJS Auth0 Example</h1>
        <p>GCAPI Solid Start App</p>
        <Counter />
      </main>
    </>
  );
};

export default Home;
