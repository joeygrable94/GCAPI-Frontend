import { Collapsible as KBCollapsible } from '@kobalte/core/collapsible';
import { children, ParentComponent } from 'solid-js';
import { ArrowDownIcon } from '../icon';
import { CollapsableProps } from './accordion.types';

const Collapsable: ParentComponent<CollapsableProps> = (props) => {
  const label = children(() => props.label);
  const styleType = props.styleType ?? 'outline';
  const color = props.color ?? 'default';
  const size = props.size ?? 'default';
  const curve = props.curve ?? 'default';
  const itemCurve = {
    default: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-3xl',
    none: 'rounded-none'
  };
  const triggerCurve = {
    default: 'rounded-none',
    small: 'rounded-t',
    medium: 'rounded-t-md',
    large: 'rounded-t-lg',
    full: 'rounded-t-3xl',
    none: 'rounded-none'
  };
  const itemColor = {
    default: 'border-gray-500',
    info: 'border-blue-600',
    error: 'border-red-500',
    warning: 'border-yellow-500',
    success: 'border-green-500',
    light: 'border-gray-400',
    dark: 'border-gray-600'
  };
  const triggerColor = {
    default: {
      fill: 'text-white bg-black',
      outline: 'border-b-black text-black'
    },
    info: {
      fill: 'text-white bg-blue-600',
      outline: 'border-b-blue-600 text-blue-600'
    },
    error: {
      fill: 'text-white bg-red-600',
      outline: 'border-b-red-600 text-red-600'
    },
    warning: {
      fill: 'text-white bg-yellow-500',
      outline: 'border-b-yellow-500 text-yellow-500'
    },
    success: {
      fill: 'text-white bg-green-600',
      outline: 'border-b-green-600 text-green-600'
    },
    light: {
      fill: 'text-gray-700 bg-gray-50',
      outline: 'border-b-gray-400 text-gray-500'
    },
    dark: {
      fill: 'text-gray-50 bg-gray-900',
      outline: 'border-b-gray-700 text-gray-800'
    }
  };
  const contentColor = {
    default: 'border-t-gray-900',
    info: 'border-t-blue-600',
    error: 'border-t-red-600',
    warning: 'border-t-yellow-500',
    success: 'border-t-green-600',
    light: 'border-t-gray-400',
    dark: 'border-t-gray-700'
  };
  const itemSize = {
    default: 'px-3 py-2 text-base',
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-3 text-lg',
    large: 'px-5 py-4 text-xl'
  };
  const itemIconSize = {
    default: 'h-5 w-5',
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-7 w-7'
  };
  return (
    <KBCollapsible
      class={`collapsible group w-full ${itemCurve[curve]} border border-solid ${itemColor[color]} overflow-hidden`}
    >
      <KBCollapsible.Trigger
        class={`collapsible__trigger inline-flex w-full items-center justify-between ${triggerCurve[curve]} ${triggerColor[color][styleType]} ${itemSize[size]} focus-visible:outline-solid text-left font-bold outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
      >
        <span class={`collapsible__trigger-text`}>{label()}</span>
        <span
          class={`collapsible__trigger-icon ${itemIconSize[size]} rotate-0 transition-transform ui-group-expanded:rotate-180`}
        >
          <div class="accordion__item-trigger-icon">
            <ArrowDownIcon aria-hidden />
          </div>
        </span>
      </KBCollapsible.Trigger>
      <KBCollapsible.Content
        class={`collapsible__content animate-collapsable-slide-up ui-expanded:animate-collapsable-slide-down w-full overflow-hidden border-t-1 ${contentColor[color]}`}
      >
        <div class={`collapsible__content-text ${itemSize[size]}`}>
          {props.children}
        </div>
      </KBCollapsible.Content>
    </KBCollapsible>
  );
};

export default Collapsable;
