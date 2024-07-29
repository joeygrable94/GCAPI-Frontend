import { NumberField } from '@kobalte/core/number-field';
import { Setter, Show, createSignal } from 'solid-js';
import { ArrowDownIcon, ArrowUpIcon } from '~/shared/ui/icon';

export type NumberInputProps = {
  name: string;
  value?: number;
  defaultValue?: number;
  label?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoResize?: boolean;
  onChange: (value: number | null) => void | Setter<number | null>;
  validationState?: 'valid' | 'invalid';
  className?: string;
};

export default function NumberInput(props: NumberInputProps) {
  const [rawValue, setRawValue] = createSignal<number | undefined>();
  const inputOnChange = (value: string | null) => {
    const numberValue = parseFloat(value || '');
    props.onChange(isNaN(numberValue) ? null : numberValue);
  };
  return (
    <NumberField
      class={`number-field flex flex-col gap-1 ${props.className ?? ''}`}
      value={props.value?.toString() ?? undefined}
      defaultValue={props.defaultValue}
      name={props.name}
      validationState={props.error ? 'invalid' : 'valid'}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={inputOnChange}
      rawValue={rawValue()}
      onRawValueChange={setRawValue}
    >
      <Show when={props.label}>
        <NumberField.Label
          class="number-field__label select-none text-gray-800"
          for={props.name}
        >
          {props.label} {props.required && <span class="text-red-700">*</span>}
        </NumberField.Label>
      </Show>
      <div class="number-field__group relative rounded outline outline-1 outline-offset-1 outline-[transparent] focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-blue-500">
        <NumberField.Input class="number-field__input inline-flex w-full min-w-52 rounded border-1 border-solid border-gray-400 bg-white px-2 py-1.5 outline-none transition-all hover:border-gray-600 ui-invalid:border-red-700" />
        <NumberField.IncrementTrigger
          aria-label="Increase"
          class="number-field__increment absolute right-1 top-1 h-3 w-3 cursor-default rounded-t bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)]"
        >
          <ArrowUpIcon />
        </NumberField.IncrementTrigger>
        <NumberField.DecrementTrigger
          aria-label="Decrease"
          class="number-field__decrement absolute bottom-1 right-1 h-3 w-3 cursor-default rounded-b bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)]"
        >
          <ArrowDownIcon />
        </NumberField.DecrementTrigger>
      </div>
      <Show when={props.description}>
        <NumberField.Description class="number-field__description mt-1 select-none text-sm">
          {props.description}
        </NumberField.Description>
      </Show>
      <Show when={props.error}>
        <NumberField.ErrorMessage class="number-field__error mt-1 select-none text-sm text-red-800">
          {props.error}
        </NumberField.ErrorMessage>
      </Show>
    </NumberField>
  );
}
