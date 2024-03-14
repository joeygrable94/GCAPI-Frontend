import { QueryObserverResult, RefetchOptions } from '@tanstack/solid-query';
import { Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { FormEditClient } from '~/features/clients';
import { ClientRead } from '~/shared/api';

type ModalEditClientProps = {
  client: ClientRead;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
};

const ModalEditClient: Component<ModalEditClientProps> = (props) => {
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
          <Modal.Title>Edit Client {props.client.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEditClient client={props.client} setComplete={setFormComplete} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditClient;
