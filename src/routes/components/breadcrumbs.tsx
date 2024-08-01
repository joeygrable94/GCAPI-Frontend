import { clientOnly } from '@solidjs/start';

const BreadcrumbsExample = clientOnly(
  () => import('~/widgets/ui-examples/breadcrumbs.ex')
);

export default function BreadcrumbsComponents() {
  return (
    <>
      <BreadcrumbsExample />
    </>
  );
}
