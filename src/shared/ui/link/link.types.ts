import { JSX } from 'solid-js';
import { ThemeElementColor } from '~/shared/ui/ui.constants';

export type LinkProps = {
  href: string;
  children: string | JSX.Element;
  color?: ThemeElementColor;
  disabled?: boolean;
  underline?: boolean;
  italic?: boolean;
  bold?: boolean;
  lineThrough?: boolean;
  overline?: boolean;
  className?: string;
};
