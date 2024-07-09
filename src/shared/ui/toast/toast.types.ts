import { ToastSwipeDirection } from '@kobalte/core/toast';
import {
  ThemeElementColor,
  ThemeElementCurve,
  ThemeElementSize,
  ThemeHorizontalPlacement,
  ThemeVerticalPlacement
} from '~/shared/ui';

export type ToastPortalPlacement =
  `${ThemeVerticalPlacement}-${ThemeHorizontalPlacement}`;

export type ToastPortalProps = {
  placement: ToastPortalPlacement;
  limit?: number;
  duration?: number;
  swipeDirection?: ToastSwipeDirection;
  pauseOnPageIdle?: boolean;
  pauseOnInteraction?: boolean;
};

export type ToastProps = {
  id: number;
  label: string;
  classList?: Record<string, boolean>;
  color?: ThemeElementColor;
  size?: ThemeElementSize;
  curve?: ThemeElementCurve;
  progressSize?: ThemeElementSize;
  progressCurve?: ThemeElementCurve;
};

export type ToastApiOptions = {
  color?: ThemeElementColor;
  size?: ThemeElementSize;
  curve?: ThemeElementCurve;
  progressSize?: ThemeElementSize;
  progressCurve?: ThemeElementCurve;
};
