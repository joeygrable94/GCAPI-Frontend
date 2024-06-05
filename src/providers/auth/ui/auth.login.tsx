import { signIn } from '@solid-mediakit/auth/client';
import { Nav } from 'solid-bootstrap';
import { Component } from 'solid-js';

const PrimaryNavAuthLogin: Component = () => (
  <Nav.Link onClick={() => void signIn('auth0')}>Login</Nav.Link>
);

export default PrimaryNavAuthLogin;
