import { A } from '@solidjs/router';
import { Container, Nav, NavDropdown, Navbar } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import { useLayoutContext } from '~/components';

const Navigation: Component = () => {
  const layoutContext = useLayoutContext();
  const handleToggleSessionLayout = () => {
    layoutContext.darkMode = !layoutContext.darkMode;
  };
  const [bg, setBg] = createSignal<'light' | 'dark'>('light');
  createEffect(() => setBg(layoutContext.darkMode === true ? 'dark' : 'light'));
  return (
    <Navbar bg={bg()} variant={bg()} expand="lg">
      <Container>
        <Navbar.Brand as={A} href="/">
          <img alt="" src={'favicon.png'} width="30" height="30" />
          {' Get Community Inc'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: '100%', 'justify-content': 'flex-start' }}>
            <Nav.Link as={A} href="/">
              Home
            </Nav.Link>
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
              style={{ 'margin-left': 'auto' }}
              menuVariant={bg()}
            >
              <NavDropdown.Item href="/login">Login</NavDropdown.Item>
              <NavDropdown.Item href="/register">Sign Up</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#account">Account</NavDropdown.Item>
            </NavDropdown>
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
