'use client';
import { NavDropdown } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { webAuthAuthorize, webAuthLogout } from '~/providers/auth/api.client';
import { useAuth0 } from '~/providers/auth/context';

type AuthNavProps = {};

const AuthNav: Component<AuthNavProps> = (props) => {
  const [authState, authAct] = useAuth0();
  const loginAction = async () => {
    await webAuthAuthorize(authAct.webAuth, authAct.scopes);
  };
  const logoutAction = async () => {
    webAuthLogout(authAct.webAuth, authAct.logoutUrl);
    await authAct.logout();
  };
  return (
    <>
      <NavDropdown.Item onClick={loginAction}>Login</NavDropdown.Item>
      <NavDropdown.Item onClick={logoutAction}>Logout</NavDropdown.Item>
    </>
  );
};

export default AuthNav;
