import { createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { getClientCookie, setClientCookie } from '~/shared/utils';
import { THEME_COOKIE_MAX_AGE } from './constants';
import { InputLayoutOptions, LayoutOptions } from './types';

export function isSysLayoutDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function saveDarkMode(value: boolean) {
  setClientCookie('darkMode', value ? 'true' : 'false', THEME_COOKIE_MAX_AGE);
  localStorage.setItem('darkMode', value ? 'true' : 'false');
}

export function getSavedDarkMode() {
  const cookie = getClientCookie('darkMode');
  if (cookie === 'true') return true;
  const value = localStorage.getItem('darkMode');
  if (value === 'true') return true;
  if (value === 'false') return false;
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

export function useDarkModeCookie(name: string = 'darkMode'): boolean | undefined {
  let darkMode: string | undefined;
  if (isServer) {
    darkMode = getCookie(getRequestEvent()!, name);
  } else {
    darkMode = getClientCookie(name);
  }
  if (darkMode?.length) {
    return darkMode === 'true' ? true : false;
  }
}
