import { Button } from '@kobalte/core/button';
import { Component, createMemo } from 'solid-js';
import { ThemeMode, useTheme } from '~/providers/theme';

interface ButtonToggleDarkModeProps {
  class: string;
}

const ButtonToggleDarkMode: Component<ButtonToggleDarkModeProps> = (props) => {
  const [theme, themeAct] = useTheme();
  const handleToggleSessionTheme = () => {
    themeAct.setDarkMode(!theme.darkMode);
  };
  const themeText = createMemo<ThemeMode>(() => {
    return theme.darkMode === true ? 'light' : 'dark';
  });
  return (
    <Button onClick={() => handleToggleSessionTheme()} class={props.class}>
      Toggle {themeText()} mode
    </Button>
  );
};

export default ButtonToggleDarkMode;
