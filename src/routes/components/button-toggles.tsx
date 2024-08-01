import { clientOnly } from '@solidjs/start';

const ButtonTogglesExample = clientOnly(
  () => import('~/widgets/ui-examples/button-toggles.ex')
);

export default function ButtonTogglesComponents() {
  return (
    <>
      <ButtonTogglesExample />
    </>
  );
}
