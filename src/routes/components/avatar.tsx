import { clientOnly } from '@solidjs/start';

const AvatarExample = clientOnly(() => import('~/widgets/ui-examples/avatar.ex'));

export default function AvatarComponents() {
  return (
    <>
      <AvatarExample />
    </>
  );
}
