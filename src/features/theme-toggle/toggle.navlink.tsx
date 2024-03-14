import { Nav } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component, Match, Switch, createMemo } from 'solid-js';
import { ThemeMode, saveDarkMode, useThemeContext } from '~/providers/theme';

type NavLinkToggleDarkModeProps = {};

const NavLinkToggleDarkMode: Component<NavLinkToggleDarkModeProps> = (props) => {
  const theme = useThemeContext();
  const handleToggleSessionTheme = () => {
    theme.darkMode = !theme.darkMode;
    saveDarkMode(theme.darkMode);
  };
  const themeText = createMemo<ThemeMode>(() => {
    return theme.darkMode === true ? 'light' : 'dark';
  });
  return (
    <Nav.Link href="#" onClick={() => handleToggleSessionTheme()}>
      <Switch>
        <Match when={theme.darkMode === true}>
          <Icon path={sun} class="icon" />
        </Match>
        <Match when={theme.darkMode === false}>
          <Icon path={moon} class="icon" />
        </Match>
      </Switch>
    </Nav.Link>
  );
};

export default NavLinkToggleDarkMode;
