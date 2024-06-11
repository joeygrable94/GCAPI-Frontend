import { createSession } from '@solid-mediakit/auth/client';
import { A } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { NavDropdown } from 'solid-bootstrap';
import { Component, Show, createMemo } from 'solid-js';
import { ThemeMode, useTheme } from '~/providers/theme';

const PrimaryNavAuthLogin = clientOnly(() => import('~/providers/auth/ui/auth.login'));
const PrimaryNavAuthLogout = clientOnly(
  () => import('~/providers/auth/ui/auth.logout')
);

const PrimaryNavAuthRight: Component = () => {
  const auth = createSession();
  const [theme] = useTheme();
  const bg = createMemo<ThemeMode>(() => (theme.darkMode ? 'dark' : 'light'));
  return (
    <Show when={auth()} keyed fallback={<PrimaryNavAuthLogin />}>
      <NavDropdown title="Account" menuVariant={bg()}>
        <NavDropdown.Item as={A} href={`/users/profile`}>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <PrimaryNavAuthLogout />
      </NavDropdown>
    </Show>
  );
};

export default PrimaryNavAuthRight;
