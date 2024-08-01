import { clientOnly } from '@solidjs/start';

const CollapsablesExample = clientOnly(
  () => import('~/widgets/ui-examples/collapsable.ex')
);

export default function CollapsablesComponents() {
  return (
    <>
      <CollapsablesExample />
    </>
  );
}
