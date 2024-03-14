import { QueryObserverResult, RefetchOptions } from '@tanstack/solid-query';
import { Button, Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { ApiError, ClientRead, ClientsService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

type ModalDeleteClientProps = {
  client: ClientRead;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
};

const ModalDeleteClient: Component<ModalDeleteClientProps> = (props) => {
  const [formComplete, setFormComplete] = createSignal(false);
  const handleClose = () => {
    props.setOpen(false);
    props.refetch();
  };
  const deleteClient = async () => {
    try {
      const response = await ClientsService.clientsDeleteApiV1ClientsClientIdDelete({
        clientId: props.client.id
      });
      log(response);
    } catch (err: ApiError | Error | any) {
      logError('Error deleting client:', err.message);
    }
    handleClose();
  };
  createEffect(() => (formComplete() ? handleClose() : undefined));
  return (
    <>
      <Modal show={props.open()} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this client?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{props.client.title}</h2>
          <p>{props.client?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            No, Exit
          </Button>
          <Button variant="danger" onClick={deleteClient}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteClient;
