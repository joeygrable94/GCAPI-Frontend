import { ParentProps } from 'solid-js';

export type ThemeMode = 'light' | 'dark';

export type InputThemeOptions = {
  darkMode?: boolean;
};

export type ThemeOptions = {
  darkMode: boolean;
};

export type ThemeConfig = {
  darkMode: boolean;
};

export interface ThemeConfigProps extends ParentProps {}

export type ThemeConfigActions = {
  systemPreference: () => boolean;
  isDarkMode: () => boolean;
  setDarkMode: (value: boolean) => void;
};

export type ThemeContextProvider = [ThemeConfig, ThemeConfigActions];
