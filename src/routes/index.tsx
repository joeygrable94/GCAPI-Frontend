import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';
import { useAuth0 } from '~/components';

const Home: Component = () => {
  const [authState, authAct] = useAuth0();
  return (
    <>
      <Title>GCAPI Solid JS</Title>
      <main>
        <h1>SolidJS Auth0 Example</h1>
        <p>GCAPI Solid Start App</p>
        <pre>
          <code>{JSON.stringify(authState, null, 2)}</code>
        </pre>
      </main>
    </>
  );
};

export default Home;
