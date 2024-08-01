import { clientOnly } from '@solidjs/start';

const AccordionsExample = clientOnly(
  () => import('~/widgets/ui-examples/accordion.ex')
);

export default function AccordionsComponents() {
  return (
    <>
      <AccordionsExample />
    </>
  );
}
