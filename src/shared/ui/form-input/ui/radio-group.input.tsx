import { RadioGroup } from '@kobalte/core/radio-group';
import { For, Show } from 'solid-js';

type RadioGroupInputProps = {
  name: string;
  options: string[];
  value: string | null;
  defaultValue?: string;
  label?: string;
  orientation?: 'horizontal' | 'vertical';
  required?: boolean;
  description?: string;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange: (value: string | null) => void;
};

export default function RadioGroupInput(props: RadioGroupInputProps) {
  return (
    <RadioGroup
      class="radio-group flex flex-col gap-2"
      name={props.name}
      value={props.value ?? ''}
      defaultValue={props.defaultValue}
      orientation={props.orientation}
      validationState={props.error ? 'invalid' : 'valid'}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={props.onChange}
    >
      <Show when={props.label}>
        <RadioGroup.Label class="radio-group__label select-none text-gray-800">
          {props.label} {props.required && <span class="text-red-700">*</span>}
        </RadioGroup.Label>
      </Show>
      <div class="radio-group__items flex gap-4" role="presentation">
        <For each={props.options}>
          {(value) => (
            <RadioGroup.Item value={value} class="radio flex items-center">
              <RadioGroup.ItemInput class="radio__input peer" />
              <RadioGroup.ItemControl class="radio__control flex h-5 w-5 items-center justify-center rounded-[10px] border-1 border-solid border-gray-400 bg-gray-100 hover:cursor-pointer peer-focus-within:outline peer-focus-within:outline-1 peer-focus-within:outline-offset-1 peer-focus-within:outline-blue-500 peer-focus-within:ui-invalid:outline-red-700 ui-checked:border-blue-700 ui-checked:bg-blue-500 ui-checked:ui-invalid:border-red-700 ui-checked:ui-invalid:bg-red-500">
                <RadioGroup.ItemIndicator class="radio__indicator h-[10px] w-[10px] rounded-[5px] bg-gray-100" />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemLabel class="radio__label ml-2 select-none hover:cursor-pointer">
                {value}
              </RadioGroup.ItemLabel>
            </RadioGroup.Item>
          )}
        </For>
      </div>
      <Show when={props.description}>
        <RadioGroup.Description class="radio__description mt-1 select-none text-sm">
          {props.description}
        </RadioGroup.Description>
      </Show>
      <Show when={props.error}>
        <RadioGroup.ErrorMessage class="radio__error-message mt-1 select-none text-sm text-red-700">
          {props.error}
        </RadioGroup.ErrorMessage>
      </Show>
    </RadioGroup>
  );
}
