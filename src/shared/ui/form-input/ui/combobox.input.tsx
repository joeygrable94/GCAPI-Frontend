import { Combobox } from '@kobalte/core/combobox';
import { Show, children } from 'solid-js';
import { ComboboxInputProps } from '~/shared/ui/form-input';
import { CaretSortIcon, CheckIcon } from '~/shared/ui/icon';

const ComboboxInput = <T,>(props: ComboboxInputProps<T>) => {
  const optionTextValue = props.optionTextValue;
  const icon = children(() => props.triggerIcon);
  return (
    <Combobox
      class={`${props.className ?? ''} combobox`}
      name={props.name}
      defaultFilter={props.defaultFilter}
      value={props.value}
      defaultValue={props.defaultValue}
      options={props.options}
      validationState={props.error ? 'invalid' : 'valid'}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={props.onChange}
      // onInputChange={onInputChange}
      optionValue={props.optionValue}
      optionTextValue={optionTextValue}
      optionLabel={props.optionLabel}
      optionDisabled={props.optionDisabled}
      placeholder={props.placeholder}
      open={props.open}
      defaultOpen={props.defaultOpen}
      removeOnBackspace={props.removeOnBackspace}
      allowDuplicateSelectionEvents={props.allowDuplicateSelectionEvents}
      disallowEmptySelection={props.disallowEmptySelection}
      closeOnSelection={props.closeOnSelection}
      selectionBehavior={props.selectionBehavior}
      virtualized={props.virtualized}
      modal={props.modal}
      preventScroll={props.preventScroll}
      itemComponent={(props) => (
        <Combobox.Item
          item={props.item}
          class="combobox__item relative flex h-8 select-none items-center justify-between rounded-sm px-2 py-1 text-gray-900 outline-none ui-disabled:text-gray-700 ui-disabled:opacity-50 ui-highlighted:bg-blue-400 ui-highlighted:text-white ui-highlighted:outline-none"
        >
          <Combobox.ItemLabel>
            {props.item.rawValue?.[optionTextValue] as string}
          </Combobox.ItemLabel>
          <Combobox.ItemIndicator class="combobox__item-indicator inline-flex h-5 w-5 items-center justify-center">
            <CheckIcon />
          </Combobox.ItemIndicator>
        </Combobox.Item>
      )}
    >
      <Show when={props.label}>
        <span class="mb-1 block w-auto">
          {props.label} {props.required && <span class="text-red-700">*</span>}
        </span>
      </Show>
      <Combobox.HiddenSelect />
      <Combobox.Control
        class="combobox__control inline-flex w-full min-w-52 justify-between rounded border border-solid border-gray-400 bg-white px-2 py-1 text-gray-900 outline-none outline-0 transition-colors hover:border-gray-600 ui-invalid:border-red-700"
        aria-label={props.triggerLabel}
      >
        <Combobox.Input class="combobox__input inline-flex min-h-6 min-w-0 appearance-none rounded-s bg-transparent p-0.5 outline-none placeholder:text-gray-700 focus-visible:outline-none" />
        <Combobox.Trigger class="combobox__trigger text-gray inline-flex w-auto appearance-none items-center justify-center rounded-e border border-solid border-gray-100 bg-gray-200 px-2 text-gray-900 outline-none transition-colors">
          <Combobox.Icon class="combobox__icon h-5 w-4 basis-5">
            <Show fallback={<CaretSortIcon />} when={props.triggerIcon}>
              {icon()}
            </Show>
          </Combobox.Icon>
        </Combobox.Trigger>
      </Combobox.Control>
      <Combobox.Portal>
        {/* ui-expanded:animate-select-content-show animate-select-content-hide */}
        <Combobox.Content class="combobox__content rounded border-1 border-solid border-gray-400 bg-white shadow-sm outline-0">
          <Combobox.Listbox class="combobox__listbox m-0 max-h-80 overflow-y-auto px-2 py-1 children:my-1 children-hover:bg-blue-500" />
        </Combobox.Content>
      </Combobox.Portal>
      <Show when={props.description}>
        <Combobox.Description class="combobox__description mt-2 select-none text-sm">
          {props.description}
        </Combobox.Description>
      </Show>
      <Show when={props.error !== undefined}>
        <Combobox.ErrorMessage class="combobox__error-message mt-2 select-none text-sm text-red-700">
          {props.error}
        </Combobox.ErrorMessage>
      </Show>
    </Combobox>
  );
};

export default ComboboxInput;