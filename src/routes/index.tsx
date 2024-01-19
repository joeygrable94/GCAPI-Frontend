import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';
import { AuthorizedAccess, useAuth0 } from '~/components';

const Home: Component = () => {
  const [authState, authAct] = useAuth0();
  return (
    <>
      <Title>GCAPI Solid JS</Title>
      <main>
        <h1>GCAPI Auth0 Secured Backend</h1>
        <AuthorizedAccess>
          <p>Welcome {authState.user?.username}!</p>
        </AuthorizedAccess>
      </main>
    </>
  );
};

export default Home;
