import { Button } from 'solid-bootstrap';
import { Component, createMemo } from 'solid-js';
import { ThemeMode, saveDarkMode, useThemeContext } from '~/providers/theme';

type ButtonToggleDarkModeProps = {};

const ButtonToggleDarkMode: Component<ButtonToggleDarkModeProps> = (props) => {
  const themeContext = useThemeContext();
  const handleToggleSessionTheme = () => {
    themeContext.darkMode = !themeContext.darkMode;
    saveDarkMode(themeContext.darkMode);
  };
  const themeText = createMemo<ThemeMode>(() => {
    return themeContext.darkMode === true ? 'light' : 'dark';
  });
  return (
    <Button onClick={() => handleToggleSessionTheme()}>
      Toggle {themeText()} mode
    </Button>
  );
};

export default ButtonToggleDarkMode;
