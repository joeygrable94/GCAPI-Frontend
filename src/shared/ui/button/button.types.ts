import { JSX } from 'solid-js';
import {
  ThemeElementColor,
  ThemeElementCurve,
  ThemeElementSize,
  ThemeElementStyleType
} from '~/shared/ui/ui.constants';

export type ButtonGroupGap = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '8';

export type ButtonVariables = {
  styleType?: ThemeElementStyleType;
  color?: ThemeElementColor;
  size?: ThemeElementSize;
  curve?: ThemeElementCurve;
  fullWidth?: boolean;
};

export type ButtonProps = ButtonVariables & {
  children: JSX.Element;
  type?: string;
  label?: string;
  disabled?: boolean;
  onClick: () => void;
  tabIndex?: number;
  active?: boolean;
};

export type ButtonGroupButtonProps = ButtonVariables & {
  value: string;
  label?: string;
  children: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
  tabIndex?: number;
  active?: boolean;
};

export type ButtonGroupProps = ButtonVariables & {
  orientation?: 'horizontal' | 'vertical';
  defaultValue?: string | Array<string>;
  multiple?: boolean;
  disabled?: boolean;
  gap?: ButtonGroupGap;
  items: ButtonGroupButtonProps[];
};
