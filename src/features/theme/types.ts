export type ThemeModes = 'light' | 'dark';

export type ThemeState = {
  mode: ThemeModes;
};

export type ThemeActions = {
  userPrefersDarkMode: () => boolean;
  toggleColorMode: () => void;
};

export type ThemeContext = [ThemeState, ThemeActions];
