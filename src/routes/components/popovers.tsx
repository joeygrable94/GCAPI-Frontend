import { clientOnly } from '@solidjs/start';

const PopoversExample = clientOnly(() => import('~/widgets/ui-examples/popovers.ex'));

export default function PopoversComponents() {
  return (
    <>
      <PopoversExample />
    </>
  );
}
