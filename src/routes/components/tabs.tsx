import { clientOnly } from '@solidjs/start';

const TabsExample = clientOnly(() => import('~/widgets/ui-examples/tabs.ex'));

export default function TabsComponents() {
  return (
    <>
      <TabsExample />
    </>
  );
}
