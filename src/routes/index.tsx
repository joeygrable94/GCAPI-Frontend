import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';
// import { useAuth } from '~/features';

const Home: Component = () => {
  // const [state, setState] = useAuth();
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
