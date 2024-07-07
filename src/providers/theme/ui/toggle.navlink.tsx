import { Icon } from 'solid-heroicons';
import { moon, sun } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { ButtonToggle } from '~/shared/ui/button';

interface NavLinkToggleDarkModeProps {
  class: string;
}

const NavLinkToggleDarkMode: Component<NavLinkToggleDarkModeProps> = (props) => {
  const [theme, themeAct] = useTheme();
  return (
    <ButtonToggle
      iconActive={<Icon path={moon} style={{ width: '24px' }} />}
      iconInactive={<Icon path={sun} style={{ width: '24px' }} />}
      curve="full"
      pressed={theme.darkMode}
      onPressed={(pressed: boolean) => {
        themeAct.setDarkMode(pressed);
      }}
    />
  );
};

export default NavLinkToggleDarkMode;
