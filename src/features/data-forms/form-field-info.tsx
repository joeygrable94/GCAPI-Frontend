import { FieldApi, ValidationError } from '@tanstack/solid-form';
import { Alert } from 'solid-bootstrap';
import { For, Show } from 'solid-js';

interface FormFieldInfoProps {
  field: FieldApi<any, any, any, any>;
}

export default function FormFieldInfo(props: FormFieldInfoProps) {
  return (
    <>
      <Show when={props.field.state.meta.isValidating}>Validating...</Show>
      <Show when={props.field.state.meta.touchedErrors}>
        <For each={props.field.state.meta.touchedErrors}>
          {(error: ValidationError) => (
            <Alert class="my-2 px-2 py-1" variant="danger">
              {error}
            </Alert>
          )}
        </For>
      </Show>
    </>
  );
}
