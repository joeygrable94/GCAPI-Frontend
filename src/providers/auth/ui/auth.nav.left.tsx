import { createSession } from '@solid-mediakit/auth/client';
import { A } from '@solidjs/router';
import { Nav } from 'solid-bootstrap';
import { Component, Show } from 'solid-js';

const PrimaryNavAuthLeft: Component = () => {
  const auth = createSession();
  return (
    <Show when={auth()} keyed>
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
    </Show>
  );
};

export default PrimaryNavAuthLeft;
