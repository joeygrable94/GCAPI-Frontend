import { NavDropdown } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useAuth0, webAuthAuthorize, webAuthLogout } from '~/features/auth';

type AuthNavProps = {};

const AuthNav: Component<AuthNavProps> = (props) => {
  'use client';
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
