import { clientOnly } from '@solidjs/start';

const ToastExample = clientOnly(() => import('~/widgets/ui-examples/toast.ex'));

export default function ToastComponents() {
  return (
    <>
      <ToastExample />
    </>
  );
}
