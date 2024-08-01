import { clientOnly } from '@solidjs/start';

const AlertsExample = clientOnly(() => import('~/widgets/ui-examples/alerts.ex'));

export default function AlertsComponents() {
  return (
    <>
      <AlertsExample />
    </>
  );
}
