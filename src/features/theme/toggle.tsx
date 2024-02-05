import { Button } from 'solid-bootstrap';
import { Component, createMemo } from 'solid-js';
import { saveDarkMode, useLayoutContext } from '~/providers/theme';

type ToggleDarkModeProps = {};
type ThemeMode = 'light' | 'dark';

const ToggleDarkMode: Component<ToggleDarkModeProps> = (props) => {
  const layoutContext = useLayoutContext();
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
