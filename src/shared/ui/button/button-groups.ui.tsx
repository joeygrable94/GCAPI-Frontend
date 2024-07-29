import { ToggleGroup } from '@kobalte/core/toggle-group';
import {
  For,
  Match,
  Switch,
  children,
  createMemo,
  createSignal,
  onMount
} from 'solid-js';
import { ButtonGroupProps } from './button.types';

export default function ButtonGroup(props: ButtonGroupProps) {
  const [buttonValue, setButtonValue] = createSignal<string>(
    props.defaultValue as string
  );
  const [buttonValues, setButtonValues] = createSignal<Array<string>>(
    props.defaultValue as string[]
  );
  const buttonCount = () => props.items.length - 1;
  const multiple = props.multiple ?? false;
  const orientation = props.orientation ?? 'horizontal';
  const gap = props.gap ? props.gap : '0';
  const hasGap = gap !== '0';
  const color = props.color ?? 'info';
  const type = props.type ?? 'fill';
  const curve = props.curve ?? 'default';
  const size = props.size ?? 'default';
  const width = props.fullWidth ? 'w-full' : 'w-auto';
  const buttonGroupGap = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8'
  };
  const buttonGroupDirection = {
    horizontal: 'flex-row',
    vertical: 'flex-col'
  };
  const buttonGroupItems = {
    horizontal: 'items-center',
    vertical: 'items-start'
  };
  const buttonGroupJustify = {
    horizontal: 'justify-start',
    vertical: 'justify-start'
  };
  const buttonSizeKey = {
    default: 'px-5 py-2',
    small: 'px-4 py-1 text-sm',
    medium: 'px-6 py-3 text-lg',
    large: 'px-12 py-4 text-xl'
  };
  const buttonColorKey = {
    info: {
      fill: 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-700 active:bg-blue-400 ui-disabled:bg-blue-600/90 ui-disabled:border-blue-600 ui-disabled:text-blue-300 ui-pressed:bg-blue-400 ui-pressed:hover:bg-blue-500',
      outline:
        'bg-white text-blue-600 border border-solid border-blue-600 hover:bg-blue-50 focus-visible:outline-blue-700 active:bg-blue-100/90 ui-disabled:bg-white ui-disabled:border-blue-200 ui-disabled:text-blue-200 ui-pressed:bg-blue-100 ui-pressed:hover:bg-blue-50'
    },
    error: {
      fill: 'bg-red-700 text-white hover:bg-red-600 focus-visible:outline-red-700 active:bg-red-500 ui-disabled:bg-red-700/90 ui-disabled:border-red-700 ui-disabled:text-red-300 ui-pressed:bg-red-500',
      outline:
        'bg-white text-red-600 border border-solid border-red-600 hover:bg-red-50 focus-visible:outline-red-700 active:bg-red-100/90 ui-disabled:bg-white ui-disabled:border-red-300 ui-disabled:text-red-300 ui-pressed:bg-red-100/90'
    },
    warning: {
      fill: 'bg-yellow-500 text-white hover:bg-yellow-400 focus-visible:outline-yellow-500 active:bg-yellow-400/90 ui-disabled:bg-yellow-500/85 ui-disabled:border-yellow-500 ui-disabled:text-yellow-100 ui-pressed:bg-yellow-400/90',
      outline:
        'bg-white text-yellow-500 border border-solid border-yellow-500 hover:bg-yellow-50 focus-visible:outline-yellow-500 active:bg-yellow-100/90 ui-disabled:bg-white ui-disabled:border-yellow-300 ui-disabled:text-yellow-300 ui-pressed:bg-yellow-100/90'
    },
    success: {
      fill: 'bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600 active:bg-green-400 ui-disabled:bg-green-600/90 ui-disabled:border-green-600 ui-disabled:text-green-300 ui-pressed:bg-green-400',
      outline:
        'bg-white text-green-600 border border-solid border-green-600 hover:bg-green-50 focus-visible:outline-green-600 active:bg-green-100/90 ui-disabled:bg-white ui-disabled:border-green-600/30 ui-disabled:text-green-600/50 ui-pressed:bg-green-100/90'
    },
    light: {
      fill: 'border border-solid border-gray-400 bg-gray-50 text-gray-700 hover:bg-gray-200 focus-visible:outline-gray-200 active:bg-white ui-disabled:bg-gray-100 ui-disabled:border-gray-200 ui-disabled:text-gray-400 ui-pressed:bg-white',
      outline:
        'bg-white text-gray-700 border border-solid border-gray-400 hover:bg-gray-100 focus-visible:outline-gray-200 active:bg-white ui-disabled:bg-gray-50 ui-disabled:border-gray-200 ui-disabled:text-gray-400 ui-pressed:bg-white'
    },
    dark: {
      fill: 'border border-solid border-gray-700 bg-gray-900 text-gray-50 hover:border-gray-800 hover:bg-gray-700 hover:text-white focus-visible:outline-gray-700 active:bg-gray-600 ui-disabled:bg-gray-700 ui-disabled:border-gray-800 ui-disabled:text-gray-300 ui-pressed:bg-gray-600',
      outline:
        'bg-white text-gray-700 border border-solid border-gray-700 hover:bg-gray-700 hover:text-white focus-visible:outline-gray-700 active:bg-gray-500 ui-disabled:bg-white ui-disabled:border-gray-200 ui-disabled:text-gray-400 ui-pressed:bg-gray-100/90 ui-pressed:hover:text-gray-700'
    }
  };
  const buttonEdgeCurve = {
    default: 'rounded',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
    none: 'rounded-none'
  };
  const buttonGroupEdgeCurve = {
    default: {
      horizontal: {
        start: 'rounded-l',
        middle: 'rounded-none',
        end: 'rounded-r'
      },
      vertical: {
        start: 'rounded-t',
        middle: 'rounded-none',
        end: 'rounded-b'
      }
    },
    small: {
      horizontal: {
        start: 'rounded-l-sm',
        middle: 'rounded-none',
        end: 'rounded-r-sm'
      },
      vertical: {
        start: 'rounded-t-sm',
        middle: 'rounded-none',
        end: 'rounded-b-sm'
      }
    },
    medium: {
      horizontal: {
        start: 'rounded-l-md',
        middle: 'rounded-none',
        end: 'rounded-r-md'
      },
      vertical: {
        start: 'rounded-t-md',
        middle: 'rounded-none',
        end: 'rounded-b-md'
      }
    },
    large: {
      horizontal: {
        start: 'rounded-l-lg',
        middle: 'rounded-none',
        end: 'rounded-r-lg'
      },
      vertical: {
        start: 'rounded-t-lg',
        middle: 'rounded-none',
        end: 'rounded-b-lg'
      }
    },
    full: {
      horizontal: {
        start: 'rounded-l-full',
        middle: 'rounded-none',
        end: 'rounded-r-full'
      },
      vertical: {
        start: 'rounded-t-full',
        middle: 'rounded-none',
        end: 'rounded-b-full'
      }
    },
    none: {
      horizontal: {
        start: 'rounded-l-none',
        middle: 'rounded-none',
        end: 'rounded-r-none'
      },
      vertical: {
        start: 'rounded-t-none',
        middle: 'rounded-none',
        end: 'rounded-b-none'
      }
    }
  };
  onMount(() => {
    if (Array.isArray(props.defaultValue)) {
      setButtonValues(props.defaultValue);
    } else if (typeof props.defaultValue === 'string') {
      setButtonValue(props.defaultValue);
    }
  });
  return (
    <>
      <Switch>
        <Match when={multiple}>
          <ToggleGroup
            class={`toggle-group flex ${buttonGroupGap[gap]} ${width} ${buttonGroupDirection[orientation]} w-auto ${buttonGroupItems[orientation]} ${buttonGroupJustify[orientation]}`}
            multiple
            value={buttonValues()}
            onChange={setButtonValues}
            orientation={orientation}
            disabled={props.disabled}
            defaultValue={(props.defaultValue as string[]) ?? ['']}
          >
            <For each={props.items}>
              {(item, index) => {
                const buttonContent = children(() => item.children);
                return (
                  <ToggleGroup.Item
                    class={`toggle-group__item ${buttonSizeKey[size]} ${buttonColorKey[color][type]}`}
                    value={item.value}
                    aria-label={item.label}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    tabIndex={item.tabIndex}
                  >
                    {buttonContent()}
                  </ToggleGroup.Item>
                );
              }}
            </For>
          </ToggleGroup>
        </Match>
        <Match when={!multiple}>
          <ToggleGroup
            class={`toggle-group flex ${buttonGroupGap[gap]} ${width} ${buttonGroupDirection[orientation]} w-auto ${buttonGroupItems[orientation]} ${buttonGroupJustify[orientation]}`}
            value={buttonValue()}
            onChange={setButtonValue}
            orientation={orientation}
            disabled={props.disabled}
            defaultValue={(props.defaultValue as string) ?? ''}
          >
            <For each={props.items}>
              {(item, index) => {
                const buttonContent = children(() => item.children);
                const buttonPosition = () => {
                  if (index() === 0) {
                    return 'start';
                  } else if (index() === buttonCount()) {
                    return 'end';
                  } else {
                    return 'middle';
                  }
                };
                const buttonCurve = createMemo(() => {
                  if (hasGap) {
                    return buttonEdgeCurve[curve];
                  } else {
                    return buttonGroupEdgeCurve[curve][orientation][buttonPosition()];
                  }
                });
                return (
                  <ToggleGroup.Item
                    class={`toggle-group__item ${buttonSizeKey[size]} ${buttonColorKey[color][type]} ${buttonCurve()}`}
                    value={item.value}
                    aria-label={item.label}
                    onClick={item.onClick}
                    disabled={item.disabled}
                    tabIndex={item.tabIndex}
                  >
                    {buttonContent()}
                  </ToggleGroup.Item>
                );
              }}
            </For>
          </ToggleGroup>
        </Match>
      </Switch>
    </>
  );
}
