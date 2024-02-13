'use client';
import { Button } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { webAuthAuthorize } from '~/providers/auth/api.client';
import { useAuth0 } from '~/providers/auth/context';

type LoginButtonProps = {};

const LoginButton: Component<LoginButtonProps> = (props) => {
  const [authState, authAct] = useAuth0();
  const loginAction = async () => {
    await webAuthAuthorize(authAct.webAuth, authAct.scopes);
  };
  return <Button onClick={loginAction}>Login</Button>;
};

export default LoginButton;
