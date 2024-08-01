import { clientOnly } from '@solidjs/start';

const ButtonGroupsExample = clientOnly(
  () => import('~/widgets/ui-examples/button-groups.ex')
);

export default function ButtonGroupsComponents() {
  return (
    <>
      <ButtonGroupsExample />
    </>
  );
}
