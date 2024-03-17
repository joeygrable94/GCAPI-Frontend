import { Form } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { IFormFieldInfoProps } from '~/features/forms';

const FormFieldInfo: Component<IFormFieldInfoProps> = (props) => {
  return (
    <>
      {props.field.state.meta.touchedErrors ? (
        <Form.Text>{props.field.state.meta.touchedErrors}</Form.Text>
      ) : null}
      {props.field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
};

export default FormFieldInfo;
