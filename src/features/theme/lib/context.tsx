import { createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { getClientCookie, setClientCookie } from '~/features/cookie/session.client';
import { InputThemeOptions, ThemeOptions } from '~/features/theme';

export function isSysThemeDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const defaultThemeOptions: ThemeOptions = {
  darkMode: isServer ? false : getSavedDarkMode() ?? isSysThemeDark()
};

const ThemeContext = createContext(defaultThemeOptions);

export function createThemeMutable(input: InputThemeOptions) {
  return createMutable({
    darkMode: input.darkMode ?? defaultThemeOptions.darkMode
  }) as ThemeOptions;
}

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function saveDarkMode(value: boolean) {
  setClientCookie('darkMode', value ? 'true' : 'false');
}

export function getSavedDarkMode() {
  const cookie = getClientCookie('darkMode');
  if (cookie === 'true') return true;
  return false;
}

export default ThemeContext;
