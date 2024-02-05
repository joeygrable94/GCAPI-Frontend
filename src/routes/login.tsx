import { Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useAuth0 } from '~/providers/auth';

const Login: Component = () => {
  const [authState, authAct] = useAuth0();

  return (
    <main>
      <h1 class="my-2">Please Log In or Register</h1>
      <Button onClick={async () => await authAct.authorize()}>Login</Button>
    </main>
  );
};

export default Login;
