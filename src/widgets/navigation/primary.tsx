import { A } from '@solidjs/router';
import { Container, Nav, NavDropdown, Navbar } from 'solid-bootstrap';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import { useAuth0, webAuthAuthorize, webAuthLogout } from '~/features/auth';
import { NavlinkToggleDarkMode, ThemeMode, useThemeContext } from '~/features/theme';

type PrimaryNavigationProps = {
  darkMode?: boolean | undefined;
};

const PrimaryNavigation: Component<PrimaryNavigationProps> = (props) => {
  const [_, authAct] = useAuth0();
  const layoutContext = useThemeContext();
  const [bg, setBg] = createSignal<ThemeMode>(props.darkMode ? 'dark' : 'light');
  const loginAction = async () => {
    await webAuthAuthorize(authAct.webAuth, authAct.scopes);
  };
  const logoutAction = async () => {
    webAuthLogout(authAct.webAuth, authAct.logoutUrl);
    await authAct.logout();
  };
  createEffect(() => setBg(layoutContext.darkMode === true ? 'dark' : 'light'));
  return (
    <Navbar bg={bg()} variant={bg()} expand="lg" style={{ padding: 0 }}>
      <Container>
        <Navbar.Brand
          as={A}
          href="/"
          style={{
            display: 'flex',
            'align-items': 'center'
          }}
        >
          <img alt="" src={'/logo.png'} width="50" height="50" />
          <span style={{ 'margin-left': '10px' }}>{'Get Community Inc'}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: '100%', 'justify-content': 'flex-start' }}>
            <Switch>
              <Match when={authAct.isInitialized() && authAct.isAuthenticated()}>
                {/* Authenticated Nav */}
                <Nav.Link as={A} href="/users">
                  Users
                </Nav.Link>
                <Nav.Link as={A} href="/clients">
                  Clients
                </Nav.Link>
                <Nav.Link as={A} href="/websites">
                  Websites
                </Nav.Link>
                <div style={{ 'margin-left': 'auto' }}></div>
                <NavDropdown title="Account" menuVariant={bg()}>
                  <NavDropdown.Item as={A} href="/users/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutAction}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Match>
              <Match when={!authAct.isAuthenticated()}>
                {/* Unauthenticated Nav */}
                <div style={{ 'margin-left': 'auto' }}></div>
                <Nav.Link onClick={loginAction}>Login</Nav.Link>
              </Match>
            </Switch>
            <NavlinkToggleDarkMode />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimaryNavigation;
