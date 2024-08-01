import { clientOnly } from '@solidjs/start';

const LinksExample = clientOnly(() => import('~/widgets/ui-examples/links.ex'));

export default function LinksComponents() {
  return (
    <>
      <LinksExample />
    </>
  );
}
