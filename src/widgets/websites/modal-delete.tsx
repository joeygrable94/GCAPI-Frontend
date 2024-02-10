import { QueryObserverResult, RefetchOptions } from '@tanstack/solid-query';
import { Button, Modal } from 'solid-bootstrap';
import { Accessor, Component, Setter, createEffect, createSignal } from 'solid-js';
import { ApiError, WebsiteRead, WebsitesService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

type ModalDeleteWebsiteProps = {
  website: WebsiteRead;
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult>;
};

const ModalDeleteWebsite: Component<ModalDeleteWebsiteProps> = (props) => {
  const [formComplete, setFormComplete] = createSignal(false);
  const deleteWebsite = async () => {
    try {
      const response = await WebsitesService.websitesDeleteApiV1WebsitesWebsiteIdDelete(
        {
          websiteId: props.website.id
        }
      );
      log(response);
    } catch (err: ApiError | Error | any) {
      logError('Error deleting website:', err.message);
    }
    handleClose();
  };
  const handleClose = () => {
    props.setOpen(false);
    props.refetch();
  };
  createEffect(() => (formComplete() ? handleClose() : undefined));
  return (
    <>
      <Modal show={props.open()} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this website?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2>{props.website.domain}</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={handleClose}>
            No, Exit
          </Button>
          <Button variant="danger" onClick={deleteWebsite}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteWebsite;
