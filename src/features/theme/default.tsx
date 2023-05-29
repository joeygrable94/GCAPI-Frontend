import { createTheme, ThemeProvider } from '@suid/material/styles';
import { Component } from 'solid-js';
import { useThemeState } from './context';

const ThemeDefault: Component<any> = (props) => {
  // @ts-ignore
  const [state, action] = useThemeState();
  const theme = createTheme({
    palette: {
      mode: state.mode
    }
  });

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default ThemeDefault;
