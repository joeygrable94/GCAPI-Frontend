import { clientOnly } from '@solidjs/start';

const ButtonsExample = clientOnly(() => import('~/widgets/ui-examples/buttons.ex'));

export default function ButtonsComponents() {
  return (
    <>
      <ButtonsExample />
    </>
  );
}
