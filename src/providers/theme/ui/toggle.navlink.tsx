import { Nav } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component, Match, Switch } from 'solid-js';
import { useTheme } from '~/providers/theme';

const NavLinkToggleDarkMode: Component = () => {
  const [theme, themeAct] = useTheme();
  const handleToggleSessionTheme = () => {
    themeAct.setDarkMode(!theme.darkMode);
  };
  return (
    <Nav.Link href="#" onClick={() => handleToggleSessionTheme()}>
      <Switch>
        <Match when={theme.darkMode === true}>
          <Icon path={sun} style={{ width: '24px' }} />
        </Match>
        <Match when={theme.darkMode === false}>
          <Icon path={moon} style={{ width: '24px' }} />
        </Match>
      </Switch>
    </Nav.Link>
  );
};

export default NavLinkToggleDarkMode;
