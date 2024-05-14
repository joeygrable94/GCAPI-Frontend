import { Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useAuth0, webAuthAuthorize } from '~/features/auth';

type LoginButtonProps = {};

const LoginButton: Component<LoginButtonProps> = (props) => {
  'use client';
  const [_, authAct] = useAuth0();
  const loginAction = async () => {
    await webAuthAuthorize(authAct.webAuth, authAct.scopes);
  };
  return <Button onClick={loginAction}>Login</Button>;
};

export default LoginButton;
