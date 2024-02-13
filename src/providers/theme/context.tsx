import { createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { getClientCookie, setClientCookie } from '~/shared/utils';
import { THEME_COOKIE_MAX_AGE } from './constants';
import { InputThemeOptions, ThemeOptions } from './types';

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
  setClientCookie('darkMode', value ? 'true' : 'false', THEME_COOKIE_MAX_AGE);
}

export function getSavedDarkMode() {
  const cookie = getClientCookie('darkMode');
  if (cookie === 'true') return true;
  return false;
}

export default ThemeContext;
