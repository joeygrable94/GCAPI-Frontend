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
  const size = props.size || 'default';
  const curve = props.curve || 'default';
  const color = props.color || 'info';
  const styleType = props.styleType || 'fill';
  console.log(color);
  const tabListColor = {
    info: {
      fill: 'data-[orientation=horizontal]:border-b-gray-600 data-[orientation=vertical]:border-r-gray-600',
      outline: ''
    },
    error: {
      fill: '',
      outline: ''
    },
    warning: {
      fill: '',
      outline: ''
    },
    success: {
      fill: '',
      outline: ''
    },
    light: {
      fill: '',
      outline: ''
    },
    dark: {
      fill: '',
      outline: ''
    }
  };
  const tabTriggerColor = {
    info: {
      fill: 'hover:bg-gray-400 focus-visible:bg-gray-200',
      outline: ''
    },
    error: {
      fill: '',
      outline: ''
    },
    warning: {
      fill: '',
      outline: ''
    },
    success: {
      fill: '',
      outline: ''
    },
    light: {
      fill: '',
      outline: ''
    },
    dark: {
      fill: '',
      outline: ''
    }
  };
  const tabIndicatorColor = {
    info: 'bg-gray-600',
    error: 'bg-red-700',
    warning: 'bg-yellow-500',
    success: 'bg-green-600',
    light: 'bg-gray-400',
    dark: 'bg-gray-700'
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
        class={`tabs__list relative flex data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-end data-[orientation=horizontal]:items-center data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-r ${tabListColor[color][styleType]}`}
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
