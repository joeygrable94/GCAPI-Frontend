import { Select } from '@kobalte/core/select';
import { Show, children } from 'solid-js';
import { SelectInputProps } from '~/shared/ui/form-input';
import { CaretSortIcon, CheckIcon } from '~/shared/ui/icon';

const SelectInput = <T,>(props: SelectInputProps<T>) => {
  const optionLabel = props.optionTextValue;
  const icon = children(() => props.triggerIcon);
  return (
    <Select
      class={`${props.className ?? ''} select`}
      value={props.value}
      defaultValue={props.defaultValue}
      options={props.options}
      validationState={props.error ? 'invalid' : 'valid'}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={props.onChange}
      optionValue={props.optionValue}
      optionTextValue={optionLabel}
      optionDisabled={props.optionDisabled}
      placeholder={props.placeholder}
      itemComponent={(props) => (
        <Select.Item
          item={props.item}
          class="select__item relative flex h-8 select-none items-center justify-between rounded-sm px-2 py-1 text-gray-900 outline-none ui-disabled:text-gray-700 ui-disabled:opacity-50 ui-highlighted:bg-blue-400 ui-highlighted:text-white ui-highlighted:outline-none"
        >
          <Select.ItemLabel>
            {props.item.rawValue?.[optionLabel] as unknown as string | number}
          </Select.ItemLabel>
          <Select.ItemIndicator class="select__item-indicator inline-flex h-5 w-5 items-center justify-center">
            <CheckIcon />
          </Select.ItemIndicator>
        </Select.Item>
      )}
    >
      <Show when={props.label}>
        <span class="mb-1 block w-auto">
          {props.label} {props.required && <span class="text-red-700">*</span>}
        </span>
      </Show>
      <Select.HiddenSelect />
      <Select.Trigger
        class="select__trigger inline-flex min-h-8 w-full min-w-52 items-center justify-between rounded border-1 border-solid border-gray-400 bg-white p-1 text-gray-900 outline-0 transition-colors hover:border-gray-600 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 ui-invalid:border-red-700"
        aria-label={props.triggerLabel}
      >
        <Select.Value<T> class="select__value overflow-hidden whitespace-nowrap p-0.5 text-gray-700 ui-placeholder-shown:text-gray-700">
          {(state) => {
            const displayValue: T = state.selectedOption();
            return displayValue[props.optionTextValue] as string | number;
          }}
        </Select.Value>
        <Select.Icon class="select__icon ml-1 h-5 w-5 basis-5">
          <Show fallback={<CaretSortIcon />} when={props.triggerIcon}>
            {icon()}
          </Show>
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        {/* ui-expanded:animate-select-content-show animate-select-content-hide */}
        <Select.Content class="select__content rounded border-1 border-solid border-gray-400 bg-white shadow-sm outline-0">
          <Select.Listbox class="select__listbox m-0 max-h-80 overflow-y-auto p-1 children:my-1 children-hover:bg-blue-500" />
        </Select.Content>
      </Select.Portal>
      <Show when={props.description}>
        <Select.Description class="select__description mt-2 select-none text-sm">
          {props.description}
        </Select.Description>
      </Show>
      <Show when={props.error}>
        <Select.ErrorMessage class="select__error-message mt-2 select-none text-sm text-red-700">
          {props.error}
        </Select.ErrorMessage>
      </Show>
    </Select>
  );
};

export default SelectInput;
