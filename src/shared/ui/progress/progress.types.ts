import { JSX } from 'solid-js';
import { ThemeElementColor, ThemeElementCurve, ThemeElementSize } from '~/shared/ui';

export type ProgressBarProps = {
  value: number;
  label: string;
  labelContent?: JSX.Element;
  minValue?: number;
  maxValue?: number;
  getValueLabel?: (params: { value: number; min: number; max: number }) => string;
  indeterminate?: boolean;
  size?: ThemeElementSize;
  color?: ThemeElementColor;
  fullWidth?: boolean;
  curve?: ThemeElementCurve;
};
