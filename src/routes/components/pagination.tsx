import { clientOnly } from '@solidjs/start';

const PaginationExample = clientOnly(
  () => import('~/widgets/ui-examples/pagination.ex')
);

export default function PaginationComponents() {
  return (
    <>
      <PaginationExample />
    </>
  );
}
