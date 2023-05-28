import {
  Component,
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  ThemeActions,
  ThemeContext,
  ThemeState,
} from './types';
import { useMediaQuery } from '@suid/material';

const ThemeStateContext = createContext<ThemeContext>();

// @ts-ignore
export function ThemeProvider(props) {
  const [isDarkMode, setDarkMode] = createSignal(false);
  const stored: string | null = !import.meta.env.SSR ? localStorage.getItem(import.meta.env.VITE_APP_THEME_STORAGE_KEY) : null;
  const [state, setState] = createStore<ThemeState>(
    stored
      ? JSON.parse(stored)
      : {
          mode: 'light',
        }
  );
  const actions: ThemeActions = {
    userPrefersDarkMode: () => {
      if (!import.meta.env.SSR) {
        const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
        return prefersDarkMode();
      }
      return isDarkMode();
    },
  };
  const store: ThemeContext = [state, actions];

  onMount(() => {
    if (actions.userPrefersDarkMode()) {
      setState('mode', 'dark');
      setDarkMode(true);
    } else {
      setState('mode', 'light');
      setDarkMode(false);
    }
  });

  createEffect(() =>
    localStorage.setItem(
      import.meta.env.VITE_APP_LOCAL_STORAGE_KEY,
      JSON.stringify(state)
    )
  );

  return (
    <ThemeStateContext.Provider value={store}>
      {props.children}
    </ThemeStateContext.Provider>
  );
}

export function useThemeState<ThemeContext>() {
  return useContext(ThemeStateContext);
}

export default ThemeProvider;
