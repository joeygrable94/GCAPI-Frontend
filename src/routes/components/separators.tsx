import { clientOnly } from '@solidjs/start';

const SeparatorsExample = clientOnly(
  () => import('~/widgets/ui-examples/separators.ex')
);

export default function SeparatorsComponents() {
  return (
    <>
      <SeparatorsExample />
    </>
  );
}
