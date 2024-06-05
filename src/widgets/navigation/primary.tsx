import { A } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Container, Nav, Navbar } from 'solid-bootstrap';
import { Component, createMemo } from 'solid-js';
import { NavlinkToggleDarkMode, ThemeMode, useTheme } from '~/providers/theme';

const PrimaryNavAuthLeft = clientOnly(
  () => import('~/providers/auth/ui/auth.nav.left')
);
const PrimaryNavAuthRight = clientOnly(
  () => import('~/providers/auth/ui/auth.nav.right')
);

const PrimaryNavigation: Component = () => {
  const [theme] = useTheme();
  const bg = createMemo<ThemeMode>(() => (theme.darkMode ? 'dark' : 'light'));
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
          <img alt="" src={'/favicon.ico'} width="50" height="50" />
          <span style={{ 'margin-left': '10px' }}>{'Get Community Inc'}</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ width: '100%', 'justify-content': 'flex-start' }}>
            <PrimaryNavAuthLeft />
            <div style={{ 'margin-left': 'auto' }} />
            <PrimaryNavAuthRight />
            <NavlinkToggleDarkMode />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PrimaryNavigation;
