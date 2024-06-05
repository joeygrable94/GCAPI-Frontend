import { Button } from 'solid-bootstrap';
import { Component, createMemo } from 'solid-js';
import { ThemeMode, useTheme } from '~/providers/theme';

const ButtonToggleDarkMode: Component = () => {
  const [theme, themeAct] = useTheme();
  const handleToggleSessionTheme = () => {
    themeAct.setDarkMode(!theme.darkMode);
  };
  const themeText = createMemo<ThemeMode>(() => {
    return theme.darkMode === true ? 'light' : 'dark';
  });
  return (
    <Button onClick={() => handleToggleSessionTheme()}>
      Toggle {themeText()} mode
    </Button>
  );
};

export default ButtonToggleDarkMode;
