// Cookie max-age = 28 days (2419200) since this is NOT sensitive info
export const THEME_COOKIE_MAX_AGE = 1 * 60 * 60 * 24 * 28;
export const DEFAULT_THEME_MODE_OPTIONS = ['light', 'dark'];
export const DEFAULT_THEME_MODE = 'light';

export type BOOSTRAP_CONTEXTUAL_VARIANT =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'light'
  | 'dark';
