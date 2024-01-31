import { createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { getRequestEvent, isServer } from 'solid-js/web';
import { getCookie } from 'vinxi/server';
import { getClientCookie, setClientCookie } from '~/utils';
import { THEME_COOKIE_MAX_AGE } from './constants';
import { InputLayoutOptions, LayoutOptions } from './types';

export function isSysLayoutDark() {
  'use client';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export const defaultLayoutOptions: LayoutOptions = {
  darkMode: isServer ? getSavedDarkModeSSR() : getSavedDarkMode() ?? isSysLayoutDark()
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

export function saveDarkMode(value: boolean) {
  'use client';
  setClientCookie('darkMode', value ? 'true' : 'false', THEME_COOKIE_MAX_AGE);
  localStorage.setItem('darkMode', value ? 'true' : 'false');
}

export function getSavedDarkModeSSR(): boolean {
  'use server';
  let cookie = getCookie(getRequestEvent()!, 'darkMode');
  if (cookie === 'true') return true;
  return false;
}

export function getSavedDarkMode(): boolean | undefined {
  'use client';
  const cookie = getClientCookie('darkMode');
  if (cookie === 'true') return true;
  const value = localStorage.getItem('darkMode');
  if (value === 'true') return true;
  if (value === 'false') return false;
}

export default LayoutContext;

export function useDarkModeCookie(name: string = 'darkMode') {
  let darkMode: string | undefined;
  if (isServer) {
    darkMode = getCookie(getRequestEvent()!, name);
  } else {
    darkMode = getClientCookie(name);
  }
  if (darkMode?.length) {
    return darkMode === 'true' ? true : false;
  }
  return false;
}
