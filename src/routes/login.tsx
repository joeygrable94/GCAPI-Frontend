import { Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useAuth0 } from '~/components';

const Login: Component = () => {
  const [authState, authAct] = useAuth0();
  return (
    <main>
      <h1>Login</h1>
      <p>Login</p>
      <Button variant="primary" onClick={async () => await authAct.authorize()}>
        Login
      </Button>
    </main>
  );
};

export default Login;
