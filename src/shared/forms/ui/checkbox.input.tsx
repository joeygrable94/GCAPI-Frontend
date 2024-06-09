import { splitProps } from 'solid-js';
import { CheckboxInputProps } from '~/shared/forms';

export default function CheckboxInput(props: CheckboxInputProps) {
  const [, inputProps] = splitProps(props, ['label', 'error']);
  return (
    <div>
      <label for={props.name}>
        <input
          {...inputProps}
          checked={props.checked}
          aria-invalid={!!props.error}
          aria-errormessage={`${props.name}-error`}
        />
        {props.label && props.label}
      </label>
    </div>
  );
}
