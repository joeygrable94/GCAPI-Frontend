import { QueryObserverResult, RefetchOptions } from '@tanstack/solid-query';
import { Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { FormEditWebsite } from '~/features/websites';
import { WebsiteRead } from '~/shared/api';

type ModalEditWebsiteProps = {
  website: WebsiteRead;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
};

const ModalEditWebsite: Component<ModalEditWebsiteProps> = (props) => {
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
          <Modal.Title>Edit Website {props.website.domain}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormEditWebsite website={props.website} setComplete={setFormComplete} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalEditWebsite;
