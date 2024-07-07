import { Tabs as KBTabs } from '@kobalte/core/tabs';
import { Component, Index, JSX, children } from 'solid-js';
import { TabItemProps, TabsProps } from './tabs.types';
import { getTabs } from './tabs.utils';

export const Tab: Component<TabItemProps> = (props) => {
  return props as unknown as JSX.Element;
};

export default function Tabs(props: TabsProps) {
  const tabs = getTabs(props.children);
  const defaultValue = () => props.defaultValue ?? tabs[0]?.value;
  const orientation = props.orientation ?? 'horizontal';
  const activationMode = props.activationMode ?? 'automatic';
  const disabled = props.disabled ?? false;
  const size = props.size ?? 'default';
  const curve = props.curve ?? 'default';
  const color = props.color ?? 'default';
  const styleType = props.styleType ?? 'none';
  const tabListColor = {
    default:
      'data-[orientation=horizontal]:border-b-gray-400 data-[orientation=vertical]:border-r-gray-400',
    info: 'data-[orientation=horizontal]:border-b-blue-400 data-[orientation=vertical]:border-r-blue-400',
    error:
      'data-[orientation=horizontal]:border-b-red-400 data-[orientation=vertical]:border-r-red-400',
    warning:
      'data-[orientation=horizontal]:border-b-yellow-400 data-[orientation=vertical]:border-r-yellow-400',
    success:
      'data-[orientation=horizontal]:border-b-green-400 data-[orientation=vertical]:border-r-green-400',
    light:
      'data-[orientation=horizontal]:border-b-gray-200 data-[orientation=vertical]:border-r-gray-200',
    dark: 'data-[orientation=horizontal]:border-b-gray-700 data-[orientation=vertical]:border-r-gray-700'
  };
  const tabTriggerColor = {
    default: {
      none: 'border-1 border-solid border-transparent text-gray-600 hover:text-gray-900 ui-selected:text-gray-800',
      fill: 'border-1 border-solid border-gray-400 text-white bg-gray-400 hover:bg-gray-500 ui-selected:bg-gray-600 ui-selected:border-gray-600/50',
      outline:
        'border-1 border-solid border-gray-400 text-gray-600 bg-gray-100 hover:bg-gray-50 ui-selected:border-gray-600 ui-selected:bg-white ui-selected:border-gray-300'
    },
    info: {
      none: 'border-1 border-solid border-transparent text-blue-500 hover:text-blue-700 ui-selected:text-blue-800',
      fill: 'border-1 border-solid border-blue-400 text-white bg-blue-400 hover:bg-blue-500 ui-selected:bg-blue-600 ui-selected:border-blue-600',
      outline:
        'border-1 border-solid border-blue-400 text-blue-600 bg-blue-100 hover:bg-blue-50 ui-selected:bg-white ui-selected:border-blue-600'
    },
    error: {
      none: 'border-1 border-solid border-transparent text-red-600 hover:text-red-700 ui-selected:text-red-800',
      fill: 'border-1 border-solid border-red-400 text-white bg-red-400 hover:bg-red-500 ui-selected:bg-red-600 ui-selected:border-red-600',
      outline:
        'border-1 border-solid text-red-600 border-red-300 bg-red-100 hover:bg-red-50 ui-selected:bg-white ui-selected:border-red-600'
    },
    warning: {
      none: 'border-1 border-solid border-transparent text-yellow-500 hover:text-yellow-550 ui-selected:text-yellow-600',
      fill: 'border-1 border-solid border-yellow-500 text-white bg-yellow-500 hover:bg-yellow-400 ui-selected:bg-yellow-400 ui-selected:border-yellow-450',
      outline:
        'border-1 border-solid border-yellow-500 text-yellow-600 bg-yellow-100 hover:bg-yellow-50 ui-selected:bg-white ui-selected:border-yellow-600'
    },
    success: {
      none: 'border-1 border-solid border-transparent text-green-500 hover:text-green-600 ui-selected:text-green-700',
      fill: 'border-1 border-solid border-green-400 text-white bg-green-400 hover:bg-green-500 ui-selected:bg-green-600 ui-selected:border-green-600',
      outline:
        'border-1 border-solid border-green-400 text-green-600 bg-green-100 hover:bg-green-50 ui-selected:bg-white ui-selected:border-green-600'
    },
    light: {
      none: 'border-1 border-solid border-transparent text-gray-500 hover:text-gray-800 ui-selected:text-gray-700',
      fill: 'border-1 border-solid border-gray-300 text-gray-600 bg-gray-200 hover:bg-gray-100 ui-selected:bg-gray-100 ui-selected:border-gray-400',
      outline:
        'border-1 border-solid border-gray-300 text-gray-500 bg-gray-100 hover:bg-white hover:text-gray-500 ui-selected:bg-gray-50 ui-selected:text-gray-500 ui-selected:border-gray-400'
    },
    dark: {
      none: 'border-1 border-solid border-transparent text-gray-600 hover:text-gray-900 ui-selected:text-gray-800',
      fill: 'border-1 border-solid border-gray-700 text-gray-100 bg-gray-600 hover:bg-gray-800 ui-selected:bg-gray-900 ui-selected:border-gray-900',
      outline:
        'border-1 border-solid border-gray-400 text-gray-700 bg-gray-50 hover:border-gray-700 ui-selected:border-gray-900'
    }
  };
  const tabIndicatorColor = {
    default: 'bg-gray-800',
    info: 'bg-blue-700',
    error: 'bg-red-700',
    warning: 'bg-yellow-500',
    success: 'bg-green-600',
    light: 'bg-gray-400',
    dark: 'bg-gray-900'
  };
  const tabEdgeCurve = {
    horizontal: {
      default: 'rounded-t',
      small: 'rounded-t',
      medium: 'rounded-t-md',
      large: 'rounded-t-lg',
      full: 'rounded-full',
      none: 'rounded-none'
    },
    vertical: {
      default: 'rounded-l',
      small: 'rounded-l',
      medium: 'rounded-l-md',
      large: 'rounded-l-lg',
      full: 'rounded-full',
      none: 'rounded-none'
    }
  };
  const tabSizeKey = {
    default: 'px-4 py-2',
    small: 'px-3 py-2',
    medium: 'px-6 py-3',
    large: 'px-8 py-4'
  };
  const tabTextSize = {
    default: 'text-base',
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };
  return (
    <KBTabs
      aria-label={props.label}
      class={`tabs w-full data-[orientation=vertical]:flex ${props.className ?? ''}`}
      value={props.value}
      defaultValue={defaultValue()}
      onChange={props.onChange}
      orientation={orientation}
      activationMode={activationMode}
      disabled={disabled}
    >
      <KBTabs.List
        class={`tabs__list relative flex data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-end data-[orientation=horizontal]:items-center data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r ${tabListColor[color]}`}
      >
        <Index each={tabs}>
          {(tab) => {
            const tabValue = () => tab().value;
            const tabLabel = () => tab().label;
            const tabDisabled = () => tab().disabled;
            return (
              <KBTabs.Trigger
                class={`tabs__trigger inline-block outline-none ui-disabled:cursor-not-allowed ui-disabled:bg-transparent ui-disabled:opacity-50 ${tabTextSize[size]} ${tabSizeKey[size]} ${tabEdgeCurve[orientation][curve]} ${tabTriggerColor[color][styleType]}`}
                value={tabValue()}
                disabled={tabDisabled()}
              >
                {tabLabel()}
              </KBTabs.Trigger>
            );
          }}
        </Index>
        <KBTabs.Indicator
          class={`tabs__indicator absolute ${tabIndicatorColor[color]} transition-all data-[orientation=horizontal]:-bottom-[1px] data-[orientation=vertical]:-right-[1px] data-[orientation=horizontal]:h-[2px] data-[orientation=vertical]:w-[2px]`}
        />
      </KBTabs.List>
      <Index each={tabs}>
        {(tab) => {
          const tabContent = children(() => tab().children);
          const tabValue = () => tab().value;
          return (
            <KBTabs.Content
              class={`tabs__content ${tabSizeKey[size]} ${tabTextSize[size]}`}
              value={tabValue()}
            >
              {tabContent()}
            </KBTabs.Content>
          );
        }}
      </Index>
    </KBTabs>
  );
}
