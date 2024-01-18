import { createContext, useContext } from 'solid-js';
import { createMutable } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { InputLayoutOptions, LayoutOptions } from './types';

export function isSysLayoutDark() {
  'use client';
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
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

export function saveDarkMode(value: boolean) {
  'use client';
  localStorage.setItem('darkMode', value ? 'true' : 'false');
}

export function getSavedDarkMode() {
  'use client';
  const value = localStorage.getItem('darkMode');
  if (value === 'true') return true;
  if (value === 'false') return false;
}

export default LayoutContext;
