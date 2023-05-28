import { purple } from "@suid/material/colors";
import { createTheme, ThemeProvider } from "@suid/material/styles";
import { Component, onMount } from "solid-js";
import { useThemeState } from "./context";
import { ThemeContext } from "./types";

const ThemeDefault: Component<any> = (props) => {
  // @ts-ignore
  const [state, action] = useThemeState();
  const theme = createTheme({
    palette: {
      mode: state.mode,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}

export default ThemeDefault;
