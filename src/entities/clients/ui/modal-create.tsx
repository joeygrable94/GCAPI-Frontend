import { useNavigate } from '@solidjs/router';
import { Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { FormCreateClient } from '~/features/clients';

type ModalCreateClientProps = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
};

const ModalCreateClient: Component<ModalCreateClientProps> = (props) => {
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = createSignal(false);
  const handleClose = () => {
    props.setOpen(false);
    navigate('/clients');
  };
  createEffect(() => (formComplete() ? handleClose() : undefined));
  return (
    <>
      <Modal show={props.open()} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCreateClient setComplete={setFormComplete} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateClient;
