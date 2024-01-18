import { CloseButton, Toast } from 'solid-bootstrap';
import { ParentComponent, createMemo } from 'solid-js';
import toast from 'solid-toast';
import { useLayoutContext } from '~/components/theme';
import { ToastAlertProps } from './types';

const ToastAlert: ParentComponent<ToastAlertProps> = (props) => {
  const layout = useLayoutContext();
  const createdAt = createMemo(() => {
    return new Date(props.t.createdAt).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  });
  return (
    <>
      <Toast show={props.t.visible} bg={props.bg ?? 'light'}>
        <Toast.Header closeButton={false}>
          <img src="holder.js/20x20?text=%20" class="rounded me-2" alt="" />
          <strong class="me-auto">{props.title}</strong>
          <small>{createdAt()}</small>
          <CloseButton onClick={() => toast.dismiss(props.t.id)} />
        </Toast.Header>
        <Toast.Body>
          <span>{props.message}</span>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default ToastAlert;
