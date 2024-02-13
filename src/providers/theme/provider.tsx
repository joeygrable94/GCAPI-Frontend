import { JSX, ParentComponent, createEffect, onMount } from 'solid-js';
import { ThemeContext, createThemeMutable, saveDarkMode } from '~/providers/theme';

type ThemeProviderProps = {
  darkMode?: boolean;
  children: JSX.Element;
};

let pageDiv: HTMLDivElement;
let rootDiv: HTMLElement | null;

const ThemeProvider: ParentComponent<ThemeProviderProps> = (props) => {
  const theme = createThemeMutable({
    darkMode: props.darkMode
  });
  createEffect(() => saveDarkMode(theme.darkMode));
  const setPageTheme = () => {
    saveDarkMode(theme.darkMode);
    document.documentElement.setAttribute(
      'data-bs-theme',
      theme.darkMode ? 'dark' : 'light'
    );
    document.body.setAttribute('data-bs-theme', theme.darkMode ? 'dark' : 'light');
    rootDiv = document.getElementById('app');
    if (rootDiv !== null)
      rootDiv.setAttribute('data-bs-theme', theme.darkMode ? 'dark' : 'light');
  };
  onMount(() => setPageTheme());
  createEffect(() => setPageTheme());
  return (
    <>
      <div
        ref={pageDiv}
        id="page"
        class="viewport-height"
        data-bs-theme={theme.darkMode ? 'dark' : 'light'}
      >
        <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>
      </div>
    </>
  );
};

export default ThemeProvider;
