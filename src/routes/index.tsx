import { Component } from 'solid-js';
import { useAuth0 } from '~/components';

const Home: Component = () => {
  const [authState, authAct] = useAuth0();
  return (
    <main>
      <h1>GCAPI Auth0 Secured Backend</h1>
      <p>{authState.email}</p>
      <img src={authState.picture} alt={authState.email} />
    </main>
  );
};

export default Home;
