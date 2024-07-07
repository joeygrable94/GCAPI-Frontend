import { Accordion as KBAccordion } from '@kobalte/core/accordion';
import { For, JSX, ParentComponent } from 'solid-js';
import { ArrowDownIcon } from '~/shared/ui/icon';
import { AccordianItemProps, AccordianProps } from './accordion.types';
import { getAccordionItems } from './accordion.utils';

export const AccordionItem: ParentComponent<AccordianItemProps> = (props) => {
  return props as unknown as JSX.Element;
};

export const Accordion: ParentComponent<AccordianProps> = (props) => {
  const items = getAccordionItems(props.children);
  const defaultValue = () => props.defaultValue ?? [];
  // const width = props.fullWidth ? 'w-full' : 'w-auto';
  const styleType = props.styleType ?? 'outline';
  const color = props.color ?? 'default';
  const size = props.size ?? 'default';
  const curve = props.curve ?? 'default';
  const accordionCurve = {
    default: 'rounded-none',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-2xl',
    none: 'rounded-none'
  };
  const itemCurveKey = {
    default: 'rounded-none',
    small: 'group-first:rounded-t group-last:rounded-b',
    medium: 'group-first:rounded-t-md group-last:rounded-b-md',
    large: 'group-first:rounded-t-lg group-last:rounded-b-lg',
    full: 'group-first:rounded-t-2xl group-last:rounded-b-2xl',
    none: 'rounded-none'
  };
  const accordionColor = {
    default: {
      fill: 'border-transparent',
      outline: 'border-gray-500'
    },
    info: {
      fill: 'border-transparent',
      outline: 'border-blue-600'
    },
    error: {
      fill: 'border-transparent',
      outline: 'border-red-500'
    },
    warning: {
      fill: 'border-transparent',
      outline: 'border-yellow-500'
    },
    success: {
      fill: 'border-transparent',
      outline: 'border-green-500'
    },
    light: {
      fill: 'border-transparent',
      outline: 'border-gray-400'
    },
    dark: {
      fill: 'border-transparent',
      outline: 'border-gray-600'
    }
  };
  const itemColorKey = {
    default: {
      fill: 'border-b-white text-white bg-black',
      outline: 'border-b-black text-black'
    },
    info: {
      fill: 'border-b-blue-600 text-white bg-blue-600',
      outline: 'border-b-blue-600 text-blue-600'
    },
    error: {
      fill: 'border-b-red-600 text-white bg-red-600',
      outline: 'border-b-red-600 text-red-600'
    },
    warning: {
      fill: 'border-b-yellow-500 text-white bg-yellow-500',
      outline: 'border-b-yellow-500 text-yellow-500'
    },
    success: {
      fill: 'border-b-green-600 text-white bg-green-600',
      outline: 'border-b-green-600 text-green-600'
    },
    light: {
      fill: 'border-b-gray-400 text-gray-700 bg-gray-50',
      outline: 'border-b-gray-400 text-gray-500'
    },
    dark: {
      fill: 'border-b-gray-700 text-gray-50 bg-gray-900',
      outline: 'border-b-gray-700 text-gray-800'
    }
  };
  const itemSizeKey = {
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
    <KBAccordion
      class={`accordion peer w-full ${accordionCurve[curve]} border border-solid ${accordionColor[color][styleType]}`}
      value={props.value}
      defaultValue={defaultValue()}
      onChange={props.onChange}
      collapsible={props.collapsible}
      multiple={props.multiple}
    >
      <For each={items}>
        {(item) => {
          const itemValue = () => item.value;
          const itemLabel = () => item.label;
          const itemStyleType = item.styleType ?? styleType;
          const itemColor = item.color ?? color;
          const itemSize = item.size ?? size;
          return (
            <KBAccordion.Item
              class={`accordion__item group peer-first:mt-0`}
              value={itemValue()}
            >
              <KBAccordion.Header class="accordion__item-header flex">
                <KBAccordion.Trigger
                  class={`accordion__item-trigger inline-flex w-full items-center justify-between gap-8 border-b-1 border-solid ${itemColorKey[itemColor][itemStyleType]} group-last:border-b-0 ${itemSizeKey[itemSize]} ${itemCurveKey[curve]} focus-visible:outline-solid text-left font-bold outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500`}
                >
                  <span class="accordion__item-trigger-content">{itemLabel()}</span>
                  <span
                    class={`${itemIconSize[itemSize]} rotate-90 transition-transform ui-group-expanded:rotate-0`}
                  >
                    <ArrowDownIcon classes="accordion__item-trigger-icon" aria-hidden />
                  </span>
                </KBAccordion.Trigger>
              </KBAccordion.Header>
              <KBAccordion.Content
                class={`accordion__item-content animate-accordion-slide-up ui-expanded:animate-accordion-slide-down overflow-hidden`}
              >
                <div class={`accordion__item-content-text ${itemSizeKey[itemSize]}`}>
                  {item.children}
                </div>
              </KBAccordion.Content>
            </KBAccordion.Item>
          );
        }}
      </For>
    </KBAccordion>
  );
};
