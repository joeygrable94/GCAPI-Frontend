import { Progress as KBProgress } from '@kobalte/core/progress';
import { children } from 'solid-js';
import { ProgressBarProps } from './progress.types';

export default function ProgressBar(props: ProgressBarProps) {
  const progressLabel = children(() => props.labelContent ?? props.label);
  const minValue = props.minValue ?? 0;
  const maxValue = props.maxValue ?? 100;
  const size = props.size ?? 'default';
  const color = props.color ?? 'default';
  const width = props.fullWidth ? 'w-full' : 'w-auto';
  const curve = props.curve ?? 'default';
  const progressColorKey = {
    default: 'bg-gray-400 data-[progress=complete]:bg-gray-600',
    info: 'bg-blue-400 data-[progress=complete]:bg-blue-500',
    error: 'bg-red-400 data-[progress=complete]:bg-red-500',
    warning: 'bg-yellow-400 data-[progress=complete]:bg-yellow-500',
    success: 'bg-green-400 data-[progress=complete]:bg-green-500',
    light: 'bg-gray-200 data-[progress=complete]:bg-gray-400',
    dark: 'bg-gray-700 data-[progress=complete]:bg-gray-800'
  };
  const progressEdgeCurve = {
    default: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
    none: 'rounded-none'
  };
  const progressSizeKey = {
    default: 'h-3',
    small: 'h-2',
    medium: 'h-4',
    large: 'h-6'
  };
  return (
    <KBProgress
      value={props.value}
      minValue={minValue}
      maxValue={maxValue}
      getValueLabel={props.getValueLabel}
      indeterminate={props.indeterminate}
      class={`progress flex ${width} min-w-40 flex-col gap-1`}
    >
      <div class="progress__label-container flex justify-between">
        <KBProgress.Label class="progress__label" aria-label={props.label}>
          {progressLabel()}
        </KBProgress.Label>
        <KBProgress.ValueLabel class="progress__value-label" />
      </div>
      <KBProgress.Track
        class={`progress__track border border-solid border-gray-200 bg-gray-100 dark:bg-gray-950 ${progressSizeKey[size]} ${progressEdgeCurve[curve]}`}
      >
        <KBProgress.Fill
          class={`progress__fill h-full w-[var(--kb-progress-fill-width)] min-w-2 transition-width data-[progress=loading]:animate-progress-pulse ${progressColorKey[color]} ${progressEdgeCurve[curve]}`}
        />
      </KBProgress.Track>
    </KBProgress>
  );
}
