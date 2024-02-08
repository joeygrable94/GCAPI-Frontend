import { createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { getClientCookie, setClientCookie } from '~/shared/utils';
import { THEME_COOKIE_MAX_AGE } from './constants';
import { InputLayoutOptions, LayoutOptions } from './types';

export function isSysLayoutDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function saveDarkMode(value: boolean) {
  setClientCookie('darkMode', value ? 'true' : 'false', THEME_COOKIE_MAX_AGE);
}

export function getSavedDarkMode() {
  const cookie = getClientCookie('darkMode');
  if (cookie === 'true') return true;
  return false;
}

export const defaultLayoutOptions: LayoutOptions = {
  darkMode: isServer ? false : getSavedDarkMode() ?? isSysLayoutDark()
};

const LayoutContext = createContext(defaultLayoutOptions);

export function createLayoutMutable(input: InputLayoutOptions) {
  return createMutable({
    darkMode: input.darkMode ?? defaultLayoutOptions.darkMode
  }) as LayoutOptions;
}

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export default LayoutContext;
