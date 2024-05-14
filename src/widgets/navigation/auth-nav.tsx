import { A } from '@solidjs/router';
import { Nav, NavDropdown } from 'solid-bootstrap';
import { Accessor, Component, Match, Switch } from 'solid-js';
import { useAuth0, webAuthAuthorize, webAuthLogout } from '~/features/auth';
import { ThemeMode } from '~/features/theme';

type AuthNavProps = {
  bg: Accessor<ThemeMode>;
};

const AuthNav: Component<AuthNavProps> = (props) => {
  'use client';
  const [_, authAct] = useAuth0();
  const loginAction = async () => {
    await webAuthAuthorize(authAct.webAuth, authAct.scopes);
  };
  const logoutAction = async () => {
    webAuthLogout(authAct.webAuth, authAct.logoutUrl);
    await authAct.logout();
  };
  return (
    <Switch>
      <Match when={authAct.isInitialized() && authAct.isAuthenticated()}>
        <NavDropdown title="Account" menuVariant={props.bg()}>
          <NavDropdown.Item as={A} href="/users/profile">
            Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={logoutAction}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Match>
      <Match when={authAct.isInitialized() && !authAct.isAuthenticated()}>
        <Nav.Link onClick={loginAction}>Login</Nav.Link>
      </Match>
    </Switch>
  );
};

export default AuthNav;
