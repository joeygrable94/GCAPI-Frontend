import { A } from '@solidjs/router';
import { Container, Nav, NavDropdown, Navbar } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component, Match, Show, Switch, createEffect, createSignal } from 'solid-js';
import { CurrentUser, useAuth0 } from '~/providers/auth';
import { useLayoutContext } from '~/providers/theme';
import { isAdmin, isManager, useUser } from '~/providers/user';

type PrimaryNavigationProps = {
  user: CurrentUser;
  darkMode?: boolean | undefined;
};

const PrimaryNavigation: Component<PrimaryNavigationProps> = (props) => {
  const [authState, authAct] = useAuth0();
  const [userState, userAct] = useUser();
  const layoutContext = useLayoutContext();
  const handleToggleSessionLayout = () => {
    layoutContext.darkMode = !layoutContext.darkMode;
  };
  const [bg, setBg] = createSignal<'light' | 'dark'>(props.darkMode ? 'dark' : 'light');
  const initialUser = () => props.user.username !== 'guest';
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
            <Show
              when={initialUser()}
              fallback={
                <Nav.Link as={A} href="/">
                  Home
                </Nav.Link>
              }
            >
              <Show
                when={(initialUser() && isAdmin(props.user)) || isManager(props.user)}
              >
                <Nav.Link as={A} href="/users">
                  Users
                </Nav.Link>
              </Show>
              <Nav.Link as={A} href="/clients">
                Clients
              </Nav.Link>
              <Nav.Link as={A} href="/websites">
                Websites
              </Nav.Link>
            </Show>
            <div style={{ 'margin-left': 'auto' }}></div>
            <Show
              when={initialUser()}
              fallback={
                <Nav.Link onClick={async () => await authAct.authorize()}>
                  Login
                </Nav.Link>
              }
            >
              <NavDropdown title="Account" menuVariant={bg()}>
                <NavDropdown.Item as={A} href="/users/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={async () => await authAct.logout()}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Show>
            <Nav.Link onClick={() => handleToggleSessionLayout()}>
              <Switch>
                <Match when={layoutContext.darkMode === true}>
                  <Icon path={sun} style="width: 24px;" />
                </Match>
                <Match when={layoutContext.darkMode === false}>
                  <Icon path={moon} style="width: 24px;" />
                </Match>
              </Switch>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimaryNavigation;
