import { clientOnly } from '@solidjs/start';

const FormInputsExample = clientOnly(
  () => import('~/widgets/ui-examples/form-inputs.ex')
);

export default function FormInputsComponents() {
  return (
    <>
      <FormInputsExample />
    </>
  );
}
