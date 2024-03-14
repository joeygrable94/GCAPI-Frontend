import { useNavigate } from '@solidjs/router';
import { Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { FormCreateWebsite } from '~/features/websites';

type ModalCreateWebsiteProps = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
};

const ModalCreateWebsite: Component<ModalCreateWebsiteProps> = (props) => {
  const navigate = useNavigate();
  const [formComplete, setFormComplete] = createSignal(false);
  const handleClose = () => {
    props.setOpen(false);
    navigate('/websites');
  };
  createEffect(() => (formComplete() ? handleClose() : undefined));
  return (
    <>
      <Modal show={props.open()} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Website</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormCreateWebsite setComplete={setFormComplete} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCreateWebsite;
