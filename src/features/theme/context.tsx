import { useMediaQuery } from '@suid/material';
import {
  createContext,
  createEffect,
  createSignal,
  onMount,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { GLOBAL } from '~/features';
import { ThemeActions, ThemeContext, ThemeState } from './types';

const ThemeStateContext = createContext<ThemeContext>();

// @ts-ignore
export default function ThemeProvider(props) {
  const [isDarkMode, setDarkMode] = createSignal(false);
  const stored: string | null = !import.meta.env.SSR
    ? GLOBAL.localStorage.getItem('gcapi_theme')
    : null;
  const [state, setState] = createStore<ThemeState>(
    stored
      ? JSON.parse(stored)
      : {
          mode: 'light'
        }
  );
  const actions: ThemeActions = {
    userPrefersDarkMode: () => {
      if (!import.meta.env.SSR) {
        const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
        return prefersDarkMode();
      }
      return isDarkMode();
    }
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

  createEffect(() => GLOBAL.localStorage.setItem('gcapi_theme', JSON.stringify(state)));

  return (
    <ThemeStateContext.Provider value={store}>
      {props.children}
    </ThemeStateContext.Provider>
  );
}

export function useThemeState<ThemeContext>() {
  return useContext(ThemeStateContext);
}
