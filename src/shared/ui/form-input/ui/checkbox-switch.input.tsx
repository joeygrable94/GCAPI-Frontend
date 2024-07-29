import { Switch as KBSwitch } from '@kobalte/core/switch';
import { Show } from 'solid-js';
import { CheckboxInputProps } from '~/shared/ui/form-input';

export default function CheckboxSwitchInput(props: CheckboxInputProps) {
  return (
    <KBSwitch
      class={`switch inline-flex items-start gap-2 ${props.className ?? ''}`}
      checked={props.checked}
      defaultChecked={props.defaultChecked}
      name={props.name}
      value={props.value}
      validationState={props.error ? 'invalid' : 'valid'}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={props.onChange}
    >
      <div class="flex flex-col items-start">
        <Show when={props.label}>
          <KBSwitch.Label class="switch__label select-none hover:cursor-pointer">
            {props.label} {props.required && <span class="text-red-700">*</span>}
          </KBSwitch.Label>
        </Show>
        <Show when={props.description}>
          <KBSwitch.Description class="switch__description mt-1 text-sm">
            {props.description}
          </KBSwitch.Description>
        </Show>
        <Show when={props.error}>
          <KBSwitch.ErrorMessage class="switch__error mt-2 select-none text-sm text-red-700">
            {props.error}
          </KBSwitch.ErrorMessage>
        </Show>
      </div>
      <KBSwitch.Input class="switch__input hover:cursor-pointer" />
      <KBSwitch.Control class="switch__control mt-1 inline-flex h-[24px] w-[44px] items-center rounded-e-full rounded-s-full border-1 border-solid border-gray-400 bg-gray-400 outline outline-1 outline-offset-1 outline-[transparent] transition-outline hover:cursor-pointer hover:border-gray-600 ui-invalid:border-red-700 ui-invalid:bg-red-200 ui-checked:bg-blue-500 ui-checked:outline ui-checked:outline-1 ui-checked:outline-offset-1 ui-checked:outline-blue-500">
        <KBSwitch.Thumb class="switch__thumb h-[20px] w-[20px] translate-x-[1px] rounded-full border-1 border-solid border-gray-200 bg-white transition-transform ui-invalid:border-red-200 ui-checked:translate-x-[calc(100%_+_1px)]" />
      </KBSwitch.Control>
    </KBSwitch>
  );
}
