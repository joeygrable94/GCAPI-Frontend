import { TextField } from '@kobalte/core/text-field';
import { Match, Show, Switch } from 'solid-js';
import { TextInputProps } from '~/shared/ui/form-input';

export default function TextInput(props: TextInputProps) {
  return (
    <TextField
      class={`text_field flex flex-col gap-1 ${props.className ?? ''}`}
      name={props.name}
      value={props.value || ''}
      defaultValue={props.defaultValue}
      validationState={props.error ? 'invalid' : 'valid'}
      required={props.required}
      disabled={props.disabled}
      readOnly={props.readOnly}
      onChange={props.onChange}
    >
      <Show when={props.label}>
        <TextField.Label
          class="text-field__label select-none text-gray-800"
          for={props.name}
        >
          {props.label} {props.required && <span class="text-red-700">*</span>}
        </TextField.Label>
      </Show>
      <Switch>
        <Match when={props.type === 'text'}>
          <TextField.Input
            class="text-field__input w-100 inline-flex w-full min-w-52 rounded border-1 border-solid border-gray-400 bg-white px-2 py-1.5 outline-none transition-all placeholder:text-gray-500 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-blue-500 hover:border-gray-600 focus-visible:outline-2 ui-invalid:border-red-700 ui-invalid:text-red-800"
            placeholder={props.placeholder}
            aria-invalid={!!props.error}
            aria-errormessage={`${props.name}-error`}
          />
        </Match>
        <Match when={props.type === 'textarea'}>
          <TextField.TextArea
            class="textarea-field__inputarea hover:border-gray700 w-100 inline-flex w-full min-w-52 rounded border-1 border-solid border-gray-400 bg-white px-2 py-1.5 outline-none transition-all placeholder:text-gray-500 focus-within:outline focus-within:outline-1 focus-within:outline-offset-1 focus-within:outline-blue-500 hover:border-gray-600 focus-visible:outline-2 ui-invalid:border-red-700 ui-invalid:text-red-800"
            placeholder={props.placeholder}
            autoResize={props.autoResize}
            aria-invalid={!!props.error}
            aria-errormessage={`${props.name}-error`}
          />
        </Match>
      </Switch>
      <Show when={props.description}>
        <TextField.Description class="text-field__description mt-1 select-none text-sm">
          {props.description}
        </TextField.Description>
      </Show>
      <Show when={props.error}>
        <TextField.ErrorMessage class="text-field__error mt-1 select-none text-sm text-red-800">
          {props.error}
        </TextField.ErrorMessage>
      </Show>
    </TextField>
  );
}
