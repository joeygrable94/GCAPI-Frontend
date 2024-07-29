import { Accessor, JSX, Setter } from 'solid-js';
import {
  ThemeElementColor,
  ThemeElementCurve,
  ThemeElementSize,
  ThemeElementStyleType
} from '~/shared/ui/ui.constants';

export type PaginationProps = {
  count: number | Accessor<number>;
  page: Accessor<number>;
  setPage: Setter<number>;
  styleType?: 'none' | ThemeElementStyleType;
  size?: ThemeElementSize;
  color?: ThemeElementColor;
  curve?: ThemeElementCurve;
  showPrevious?: boolean;
  showNext?: boolean;
  showFirst?: boolean;
  showLast?: boolean;
  siblingCount?: number;
  previous?: string | JSX.Element;
  ellipsis?: string | JSX.Element;
  next?: string | JSX.Element;
  defaultPage?: number;
  fixedItems?: boolean | 'no-ellipsis';
  disabled?: boolean;
};
