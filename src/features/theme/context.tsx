import { useMediaQuery } from '@suid/material';
import {
  createContext,
  createEffect,
  onMount,
  ParentComponent,
  useContext
} from 'solid-js';
import { createStore } from 'solid-js/store';
import { ThemeActions, ThemeContext, ThemeState } from './types';

const THEME_LOCAL_STORAGE_KEY = import.meta.env.VITE_APP_LOCAL_STORAGE_KEY + '-theme';

function createThemeState(): ThemeContext {
  const stored: string | null = localStorage.getItem(THEME_LOCAL_STORAGE_KEY)
    ? localStorage.getItem(THEME_LOCAL_STORAGE_KEY)
    : null;
  const [state, setState] = createStore<ThemeState>(
    stored ? JSON.parse(stored) : { mode: 'light' }
  );
  const actions: ThemeActions = {
    userPrefersDarkMode: () => {
      const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
      return prefersDarkMode();
    },
    toggleColorMode: () => {
      if (state.mode === 'dark') setState('mode', 'light');
      else setState('mode', 'dark');
      setTimeout(() => window.location.reload(), 1);
    }
  };
  const store: ThemeContext = [state, actions] as ThemeContext;
  onMount(() => {
    if (stored === null) {
      if (actions.userPrefersDarkMode()) setState('mode', 'dark');
      else setState('mode', 'light');
    }
  });
  createEffect(() => {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, JSON.stringify(state));
  });
  return store;
}

const ThemeStateContext = createContext<ReturnType<typeof createThemeState>>();

const ThemeProvider: ParentComponent = (props) => {
  const state: ThemeContext = createThemeState();
  return (
    <ThemeStateContext.Provider value={state}>
      {props.children}
    </ThemeStateContext.Provider>
  );
};

export default ThemeProvider;

export function useThemeState(): ThemeContext {
  const ctx = useContext(ThemeStateContext);
  if (!ctx) throw new Error('<ThemeProvider> not found wrapping the <App />.');
  return ctx as ThemeContext;
}
