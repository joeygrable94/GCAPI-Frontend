import { clientOnly } from '@solidjs/start';
import { Component } from 'solid-js';
const LoginButton = clientOnly(() => import('~/features/auth/ui/login.button'));

const Login: Component = () => {
  return (
    <main>
      <h1 class="my-2">Please Log In or Register</h1>
      <LoginButton />
    </main>
  );
};

export default Login;
