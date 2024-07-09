import { Toast as KBToast, ToastSwipeDirection } from '@kobalte/core/toast';
import { ParentComponent } from 'solid-js';
import { Portal } from 'solid-js/web';
import { CloseIcon } from '~/shared/ui/icon';
import { ToastPortalProps, ToastProps } from './toast.types';

export function ToastPortal(props: ToastPortalProps) {
  const duration = () => props.duration ?? 5000;
  const placement = () => props.placement ?? 'bottom-right';
  const limit = () => props.limit ?? 5;
  const pauseOnPageIdle = () => props.pauseOnPageIdle ?? true;
  const pauseOnInteraction = () => props.pauseOnInteraction ?? true;
  const placementKey = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };
  const swipeDirection: Record<string, ToastSwipeDirection> = {
    'top-left': 'left',
    'top-right': 'right',
    'bottom-left': 'left',
    'bottom-right': 'right'
  };
  return (
    <Portal>
      <KBToast.Region
        limit={limit()}
        duration={duration()}
        pauseOnPageIdle={pauseOnPageIdle()}
        pauseOnInteraction={pauseOnInteraction()}
        swipeDirection={swipeDirection[placement()]}
      >
        <KBToast.List
          class={`toast__list z-9999 fixed m-0 flex w-full max-w-[min(calc(100vw-16px),400px)] list-none flex-col gap-2 p-4 outline-none ${placementKey[placement()]}`}
        />
      </KBToast.Region>
    </Portal>
  );
}

const Toast: ParentComponent<ToastProps> = (props) => {
  const color = () => props.color ?? 'default';
  const size = () => props.size ?? 'default';
  const curve = () => props.curve ?? 'default';
  const progressSize = () => props.progressSize ?? props.size ?? 'default';
  const progressCurve = () => props.progressCurve ?? props.curve ?? 'default';
  const toastColorKey = {
    default:
      'border-gray-200 bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-50 dark:border-gray-700',
    info: 'border-blue-600 bg-white text-blue-600',
    error: 'border-red-600 bg-white text-red-600',
    warning: 'border-yellow-500 bg-white text-yellow-500',
    success: 'border-green-600 bg-white text-green-600',
    light: 'border-gray-400 bg-gray-50 text-gray-700',
    dark: 'border-gray-700 bg-gray-200 text-gray-900'
  };
  const toastEdgeCurve = {
    default: 'rounded',
    small: 'rounded-sm',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-2xl',
    none: 'rounded-none'
  };
  const toastSizeKey = {
    default: 'p-3',
    small: 'p-2 text-sm',
    medium: 'p-4 text-lg',
    large: 'p-6 text-xl'
  };
  const progressColorKey = {
    default: 'bg-gray-400 data-[progress=complete]:bg-gray-600',
    info: 'bg-blue-400 data-[progress=complete]:bg-blue-500',
    error: 'bg-red-400 data-[progress=complete]:bg-red-500',
    warning: 'bg-yellow-400 data-[progress=complete]:bg-yellow-500',
    success: 'bg-green-400 data-[progress=complete]:bg-green-500',
    light: 'bg-gray-500 data-[progress=complete]:bg-gray-400',
    dark: 'bg-gray-700 data-[progress=complete]:bg-gray-800'
  };
  const progressEdgeCurve = {
    default: 'rounded',
    small: 'rounded-sm',
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
    <KBToast
      toastId={props.id}
      class={`toast flex flex-col items-center justify-between gap-2 border border-solid ${toastSizeKey[size()]} ${toastEdgeCurve[curve()]} ${toastColorKey[color()]} data-[openned]:animate-toast-slide-in data-[closed]:animate-toast-hide data-[swipe=move]:transform-x-[var(--kb-toast-swipe-move-x)] data-[swipe=cancel]:transform-x-[0] data-[swipe=end]:animate-toast-swipe-out data-[swipe=cancel]:transition-transform`}
    >
      <div class={`toast__content flex w-full items-start`}>
        <div>
          <KBToast.Title
            class={`toast__title text-base font-bold text-gray-900 dark:text-gray-50`}
          >
            {props.label}
          </KBToast.Title>
          <KBToast.Description
            class={`toast__description text-sm text-gray-800 dark:text-gray-100`}
          >
            {props.children}
          </KBToast.Description>
        </div>
        <KBToast.CloseButton
          class={`toast__close-button ml-auto h-4 w-4 shrink-0 text-gray-700`}
        >
          <CloseIcon />
        </KBToast.CloseButton>
      </div>
      <KBToast.ProgressTrack
        class={`toast__progress-track w-full min-w-2 border border-solid border-gray-200 bg-gray-100 dark:bg-gray-950 ${progressSizeKey[progressSize()]} ${progressEdgeCurve[progressCurve()]}`}
      >
        <KBToast.ProgressFill
          class={`toast__progress-fill h-full w-[var(--kb-toast-progress-fill-width)] transition-width data-[progress=loading]:animate-progress-pulse ${progressColorKey[color()]} ${progressEdgeCurve[progressCurve()]}`}
        />
      </KBToast.ProgressTrack>
    </KBToast>
  );
};

export default Toast;
