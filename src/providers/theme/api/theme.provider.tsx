import { cookieStorage, makePersisted } from '@solid-primitives/storage';
import { createContext, createEffect, onCleanup, onMount, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import {
  ThemeConfig,
  ThemeConfigActions,
  ThemeConfigProps,
  ThemeContextProvider
} from '~/providers/theme';
import { decryptData, encryptData } from '~/shared/utils';
import './theme-viewport-height.scss';

const ThemeConfigContext = createContext<ThemeContextProvider>();

export function isSysThemeDark() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

let pageDiv: HTMLDivElement;
let rootDiv: HTMLElement | null;

export const ThemeProvider = (props: ThemeConfigProps) => {
  const [theme, setTheme] = makePersisted(
    createStore<ThemeConfig>({ darkMode: false }),
    {
      name: 'gcapi-theme',
      storage: cookieStorage,
      serialize: encryptData,
      deserialize: decryptData
    }
  );

  const actions: ThemeConfigActions = {
    systemPreference: () => isSysThemeDark(),
    isDarkMode: () => theme.darkMode,
    setDarkMode: (value: boolean) => setTheme('darkMode', value)
  };

  const setViewportHeight = () => {
    if (typeof window === 'undefined') return;
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  const trackViewportHeight = () => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', setViewportHeight);
  };
  const untrackViewportHeight = () => {
    if (typeof window === 'undefined') return;
    window.removeEventListener('resize', setViewportHeight);
  };

  const setPageTheme = () => {
    setTheme('darkMode', theme.darkMode);
    document.documentElement.setAttribute(
      'data-bs-theme',
      theme.darkMode ? 'dark' : 'light'
    );
    document.body.setAttribute('data-bs-theme', theme.darkMode ? 'dark' : 'light');
    rootDiv = document.getElementById('app');
    if (rootDiv !== null)
      rootDiv.setAttribute('data-bs-theme', theme.darkMode ? 'dark' : 'light');
  };

  onMount(() => {
    setViewportHeight();
    trackViewportHeight();
    setPageTheme();
  });
  createEffect(() => {
    setPageTheme();
  });
  onCleanup(() => {
    untrackViewportHeight();
  });
  const state: ThemeContextProvider = [theme, actions];
  return (
    <div
      ref={pageDiv}
      id="page"
      class="viewport-height"
      data-bs-theme={theme.darkMode ? 'dark' : 'light'}
    >
      <ThemeConfigContext.Provider value={state}>
        {props.children}
      </ThemeConfigContext.Provider>
    </div>
  );
};

export default ThemeProvider;

export function useTheme(): ThemeContextProvider {
  const ctx = useContext(ThemeConfigContext);
  if (!ctx) throw new Error('<ThemeProvider> not found wrapping the <App />.');
  return ctx as ThemeContextProvider;
}
