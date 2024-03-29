import { A } from '@solidjs/router';
import { Container, Nav, Navbar } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import { AuthorizedAccess, useAuth0, useLayoutContext } from '~/components';

type NavigationProps = {};

const Navigation: Component<NavigationProps> = (props) => {
  const [authState, authAct] = useAuth0();
  const layoutContext = useLayoutContext();
  const handleToggleSessionLayout = () => {
    layoutContext.darkMode = !layoutContext.darkMode;
  };
  const [bg, setBg] = createSignal<'light' | 'dark'>('light');
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
          <img alt="" src={'logo.png'} width="50" height="50" />
          <span style={{ 'margin-left': '10px' }}>{'Get Community Inc'}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: '100%', 'justify-content': 'flex-start' }}>
            <Nav.Link as={A} href="/">
              Home
            </Nav.Link>
            <div style={{ 'margin-left': 'auto' }}></div>
            <AuthorizedAccess
              fallback={
                <Nav.Link
                  as={A}
                  href="#login"
                  onClick={async () => await authAct.authorize()}
                >
                  Login
                </Nav.Link>
              }
            >
              <Nav.Link
                as={A}
                href="#logout"
                onClick={async () => await authAct.logout()}
              >
                Logout
              </Nav.Link>
            </AuthorizedAccess>
            <Nav.Link href="#" onClick={() => handleToggleSessionLayout()}>
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

export default Navigation;
