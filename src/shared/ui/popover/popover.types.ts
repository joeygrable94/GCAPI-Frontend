import { Accessor, JSX, Setter } from 'solid-js';
import {
  ThemeBasePlacement,
  ThemeElementColor,
  ThemeElementCurve,
  ThemeElementSize
} from '~/shared/ui';

export type PopoverPlacement =
  | ThemeBasePlacement
  | `${ThemeBasePlacement}-start`
  | `${ThemeBasePlacement}-end`;

export type PopoverProps = {
  // theme
  color?: ThemeElementColor;
  size?: ThemeElementSize;
  curve?: ThemeElementCurve;
  // popover
  label: string;
  title: string;
  closeIcon?: JSX.Element;
  anchor?: JSX.Element;
  trigger?: JSX.Element;
  open: boolean;
  onOpenChange?: (open: boolean) => void | Setter<boolean>;
  defaultOpen?: boolean;
  id?: string;
  modal?: boolean;
  preventScroll?: boolean;
  // other
  getAnchorRect?: (anchor?: HTMLElement) => DOMRect;
  anchorRef?: Accessor<HTMLElement | undefined>;
  placement?: PopoverPlacement;
  gutter?: number;
  shift?: number;
  flip?: boolean | string;
  slide?: boolean;
  overlap?: boolean;
  sameWidth?: boolean;
  fitViewport?: boolean;
  hideWhenDetached?: boolean;
  detachedPadding?: number;
  arrowPadding?: number;
  arrowSize?: number;
  overflowPadding?: number;
};
