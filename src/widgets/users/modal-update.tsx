import { QueryObserverResult, RefetchOptions } from '@tanstack/solid-query';
import { Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { FormEditUser } from '~/features/users';
import { UserRead } from '~/shared/api';

type ModalEditUserProps = {
  user: UserRead;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
};

const ModalEditUser: Component<ModalEditUserProps> = (props) => {
  const [formComplete, setFormComplete] = createSignal(false);
  const handleClose = () => {
    props.setOpen(false);
    props.refetch();
  };
  createEffect(() => (formComplete() ? handleClose() : undefined));
  return (
    <>
      <Modal show={props.open()} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User {props.user.username}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEditUser user={props.user} setComplete={setFormComplete} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditUser;
