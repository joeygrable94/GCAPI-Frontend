import { Button } from 'solid-bootstrap';
import { Component, createMemo } from 'solid-js';
import { ThemeMode, saveDarkMode, useThemeContext } from '~/providers/theme';

type ToggleDarkModeProps = {};

const ToggleDarkMode: Component<ToggleDarkModeProps> = (props) => {
  const layoutContext = useThemeContext();
  const handleToggleSessionLayout = () => {
    layoutContext.darkMode = !layoutContext.darkMode;
    saveDarkMode(layoutContext.darkMode);
  };
  const themeText = createMemo<ThemeMode>(() => {
    return layoutContext.darkMode === true ? 'light' : 'dark';
  });
  return (
    <Button onClick={() => handleToggleSessionLayout()}>
      Toggle {themeText()} mode
    </Button>
  );
};

export default ToggleDarkMode;
