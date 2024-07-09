import { Popover as KBPopover } from '@kobalte/core/popover';
import { ParentComponent, Show } from 'solid-js';
import { CloseIcon } from '~/shared/ui/icon';
import { PopoverProps } from './popover.types';

const Popover: ParentComponent<PopoverProps> = (props) => {
  const color = props.color ?? 'default';
  const size = props.size ?? 'default';
  const curve = props.curve ?? 'default';
  const contentColorKey = {
    default: 'border-gray-200 bg-white text-gray-800',
    info: 'border-blue-600 bg-white text-blue-600',
    error: 'border-red-600 bg-white text-red-600',
    warning: 'border-yellow-500 bg-white text-yellow-500',
    success: 'border-green-600 bg-white text-green-600',
    light: 'border-gray-400 bg-gray-50 text-gray-700',
    dark: 'border-gray-700 bg-gray-200 text-gray-900'
  };
  const contentSizeKey = {
    default: 'px-5 py-3 text-base',
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-4 text-lg',
    large: 'px-12 py-5 text-xl'
  };
  const closeBtnSizeKey = {
    default: 'w-4 h-4',
    small: 'w-3 h-3',
    medium: 'w-5 h-5',
    large: 'w-6 h-6'
  };
  const contentEdgeCurve = {
    default: 'rounded',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-2xl',
    none: 'rounded-none'
  };
  return (
    <KBPopover
      open={props.open}
      onOpenChange={props.onOpenChange}
      defaultOpen={props.defaultOpen}
      id={props.id}
      modal={props.modal}
      preventScroll={props.preventScroll}
      getAnchorRect={props.getAnchorRect}
      anchorRef={props.anchorRef}
      placement={props.placement}
      gutter={props.gutter}
      shift={props.shift}
      flip={props.flip}
      slide={props.slide}
      overlap={props.overlap}
      sameWidth={props.sameWidth}
      fitViewport={props.fitViewport}
      hideWhenDetached={props.hideWhenDetached}
      detachedPadding={props.detachedPadding}
      arrowPadding={props.arrowPadding}
      overflowPadding={props.overflowPadding}
    >
      <Show when={props.trigger}>
        <KBPopover.Trigger class={`popover__trigger`}>
          {props.trigger}
        </KBPopover.Trigger>
      </Show>
      <KBPopover.Portal>
        <KBPopover.Content
          class={`popover__content z-50 max-w-[min(calc(100vw-16px),380px)] border border-solid ${contentColorKey[color]} ${contentEdgeCurve[curve]} ${contentSizeKey[size]} transform-origin-[var(--kb-popover-content-transform-origin)] animate-popover-content-hide shadow-lg ui-expanded:animate-popover-content-show`}
        >
          <KBPopover.Arrow size={props.arrowSize} />
          <div class={`popover__header mb-2 flex justify-between align-baseline`}>
            <KBPopover.Title aria-label={props.label} class={`popover__title`}>
              {props.title}
            </KBPopover.Title>
            <KBPopover.CloseButton
              class={`popover__close-button ${closeBtnSizeKey[size]}`}
            >
              <CloseIcon />
            </KBPopover.CloseButton>
          </div>
          <KBPopover.Description class={`popover__description`}>
            {props.children}
          </KBPopover.Description>
        </KBPopover.Content>
      </KBPopover.Portal>
    </KBPopover>
  );
};

export default Popover;
