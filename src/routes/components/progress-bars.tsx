import { clientOnly } from '@solidjs/start';

const ProgressBarsExample = clientOnly(
  () => import('~/widgets/ui-examples/progress-bars.ex')
);

export default function ProgressBarsComponents() {
  return (
    <>
      <ProgressBarsExample />
    </>
  );
}
