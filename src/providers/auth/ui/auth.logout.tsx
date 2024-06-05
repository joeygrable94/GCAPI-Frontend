import { signOut } from '@solid-mediakit/auth/client';
import { NavDropdown } from 'solid-bootstrap';
import { Component } from 'solid-js';

const PrimaryNavAuthLogout: Component = () => (
  <NavDropdown.Item
    onClick={() =>
      void signOut({
        redirectTo: '/login',
        redirect: true
      })
    }
  >
    Logout
  </NavDropdown.Item>
);

export default PrimaryNavAuthLogout;
