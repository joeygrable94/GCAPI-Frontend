import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component, Show } from 'solid-js';
import { useTheme } from '~/providers/theme';

interface NavLinkToggleDarkModeProps {
  class: string;
}

const NavLinkToggleDarkMode: Component<NavLinkToggleDarkModeProps> = (props) => {
  const [theme, themeAct] = useTheme();
  const handleToggleSessionTheme = () => {
    themeAct.setDarkMode(!theme.darkMode);
  };
  return (
    <a href="#" onClick={() => handleToggleSessionTheme()} class={props.class}>
      <Show
        when={theme.darkMode}
        fallback={<Icon path={moon} style={{ width: '24px' }} />}
      >
        <Icon path={sun} style={{ width: '24px' }} />
      </Show>
    </a>
  );
};

export default NavLinkToggleDarkMode;
