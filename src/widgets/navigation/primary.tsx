import { A } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Container, Nav, NavDropdown, Navbar } from 'solid-bootstrap';
import { Component, createEffect, createSignal } from 'solid-js';
import { NavlinkToggleDarkMode, useThemeContext } from '~/features/theme';
const AuthNav = clientOnly(() => import('./auth-nav'));

type PrimaryNavigationProps = {
  darkMode?: boolean | undefined;
};

const PrimaryNavigation: Component<PrimaryNavigationProps> = (props) => {
  const layoutContext = useThemeContext();
  const handleToggleSessionLayout = () => {
    layoutContext.darkMode = !layoutContext.darkMode;
  };
  const [bg, setBg] = createSignal<'light' | 'dark'>(props.darkMode ? 'dark' : 'light');
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
              <AuthNav />
            </NavDropdown>
            <NavlinkToggleDarkMode />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimaryNavigation;
