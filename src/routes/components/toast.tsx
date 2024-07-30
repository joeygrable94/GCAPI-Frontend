import { ToastPortal } from '@getcommunity/gcui/toast';
import { ToastExample } from '~/widgets/ui-examples';

export default function ToastComponents() {
  return (
    <>
      <ToastExample />
      <ToastPortal limit={10} placement="bottom-right" />
    </>
  );
}
