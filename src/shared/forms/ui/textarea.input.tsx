import { splitProps } from 'solid-js';
import { TextareaInputProps } from '~/shared/forms';

export default function TextareaInput(props: TextareaInputProps) {
  const [, inputProps] = splitProps(props, ['value', 'label', 'error', 'rows']);
  return (
    <div>
      {props.label && (
        <label for={props.name}>
          {props.label} {props.required && <span>*</span>}
        </label>
      )}
      <textarea
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
