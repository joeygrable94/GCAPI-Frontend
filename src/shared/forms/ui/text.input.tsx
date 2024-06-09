import { splitProps } from 'solid-js';
import { TextInputProps } from '~/shared/forms';

export default function TextInput(props: TextInputProps) {
  const [, inputProps] = splitProps(props, ['value', 'label', 'error']);
  return (
    <div>
      {props.label && (
        <label for={props.name}>
          {props.label} {props.required && <span>*</span>}
        </label>
      )}
      <input
        {...inputProps}
        id={props.name}
        value={props.value || ''}
        aria-invalid={!!props.error}
        aria-errormessage={`${props.name}-error`}
      />
      {props.error && <div id={`${props.name}-error`}>{props.error}</div>}
    </div>
  );
}
