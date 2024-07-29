import { Checkbox } from '@kobalte/core/checkbox';
import { Show } from 'solid-js';
import { CheckboxInputProps } from '~/shared/ui/form-input';
import { CheckIcon } from '~/shared/ui/icon';

export default function CheckboxInput(props: CheckboxInputProps) {
  return (
    <Checkbox
      class={`checkbox flex flex-wrap items-start gap-2 ${props.className ?? ''}`}
      checked={props.checked}
      defaultChecked={props.defaultChecked}
      name={props.name}
      value={props.value}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      validationState={props.error ? 'invalid' : 'valid'}
      onChange={props.onChange}
    >
      <Checkbox.Input class="checkbox__input peer hover:cursor-pointer" />
      <Checkbox.Control class="checkbox__control mt-1 h-5 w-5 rounded border-1 border-solid border-gray-500 bg-gray-300 hover:cursor-pointer peer-focus-visible:outline-2 peer-focus-visible:outline-gray-800 ui-invalid:border-red-600 ui-invalid:bg-red-100 ui-checked:border-blue-300 ui-checked:bg-blue-500 ui-checked:text-white">
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox.Control>
      <div class="flex flex-col items-start">
        <Show when={props.label}>
          <Checkbox.Label class="checkbox__label hover:cursor-pointer">
            {props.label} {props.required && <span class="text-red-700">*</span>}
          </Checkbox.Label>
        </Show>
        <Show when={props.description}>
          <Checkbox.Description class="checkbox__description mt-1 select-none text-sm">
            {props.description}
          </Checkbox.Description>
        </Show>
        <Show when={props.error}>
          <Checkbox.ErrorMessage class="checkbox__error mt-2 select-none text-sm text-red-700">
            {props.error}
          </Checkbox.ErrorMessage>
        </Show>
      </div>
    </Checkbox>
  );
}
