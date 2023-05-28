type ThemeModes = 'light' | 'dark';

type ThemeState = {
  mode: ThemeModes;
};

type ThemeActions = {
  userPrefersDarkMode: () => boolean;
};

type ThemeContext = [ThemeState, ThemeActions];

export type {
  ThemeModes,
  ThemeActions,
  ThemeContext,
  ThemeState,
};
