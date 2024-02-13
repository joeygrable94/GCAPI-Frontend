import { Button } from 'solid-bootstrap';
import { Component, createMemo } from 'solid-js';
import { saveDarkMode, useThemeContext } from '~/providers/theme';

type ToggleDarkModeProps = {};
type ThemeMode = 'light' | 'dark';

const ToggleDarkMode: Component<ToggleDarkModeProps> = (props) => {
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

export default ToggleDarkMode;
