import { Title } from '@solidjs/meta';
import { Component, onMount } from 'solid-js';
// import { useAuth } from '~/features';
import { log } from '~/utils';

const Home: Component = () => {
  // const [state, setState] = useAuth();
  onMount(() => {
    log('Home');
  });
  return (
    <>
      <Title>GCAPI Solid JS</Title>
      <main>
        <h1>SolidJS Auth0 Example</h1>
        <p>GCAPI Solid Start App</p>
      </main>
    </>
  );
};

export default Home;
