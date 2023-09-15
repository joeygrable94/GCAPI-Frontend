import { Title } from '@solidjs/meta';
import { Component } from 'solid-js';
import { SignUp } from '~/features';

const Register: Component = () => {
  return (
    <>
      <Title>GCAPI - Register</Title>
      <main>
        <SignUp />
      </main>
    </>
  );
};

export default Register;
