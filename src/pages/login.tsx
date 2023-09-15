import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';
import { SignIn } from '~/features';

const Login: Component = () => {
  return (
    <>
      <Title>GCAPI - Login</Title>
      <main>
        <SignIn />
      </main>
    </>
  );
};

export default Login;
