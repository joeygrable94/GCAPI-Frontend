import { JSX, Setter } from 'solid-js';
import {
  ThemeElementColor,
  ThemeElementCurve,
  ThemeElementSize,
  ThemeElementStyleType
} from '~/shared/ui';

export type AccordianCollapsableStyleProps = {
  styleType?: ThemeElementStyleType;
  color?: ThemeElementColor;
  size?: ThemeElementSize;
  curve?: ThemeElementCurve;
};

export type AccordianItemProps = {
  label: string;
  value: string;
  children: JSX.Element;
} & AccordianCollapsableStyleProps;

export type AccordianProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void | Setter<string[]>;
  collapsible?: boolean;
  multiple?: boolean;
  fullWidth?: boolean;
} & AccordianCollapsableStyleProps;

export type CollapsableProps = {
  label: string | JSX.Element;
  open: boolean;
  onOpenChange: (open: boolean) => void | Setter<boolean>;
  defaultOpen?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
} & AccordianCollapsableStyleProps;
