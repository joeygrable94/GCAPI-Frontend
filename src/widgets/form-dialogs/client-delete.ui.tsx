import { Button } from '@kobalte/core/button';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { ClientDelete, ClientRead, ClientsService } from '~/shared/api';
import { queryClient } from '~/shared/tanstack';
import { Dialog } from '~/shared/ui/dialog';
import { DeleteIcon, LoadingIcon } from '~/shared/ui/icon';

type ClientDeleteFormDialogProps = {
  client: ClientRead;
};

const ClientDeleteFormDialog: Component<ClientDeleteFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const handleSubmit = () => {
    setPending(true);
    ClientsService.clientsDeleteApiV1ClientsClientIdDelete({
      clientId: props.client.id
    })
      .then((v: ClientDelete) => {
        toast.success(`deleted client: ${v.message}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error deleting client: ${e.message}`);
        setIsSubmitted(false);
      })
      .finally(() => {
        setPending(false);
      });
  };
  createEffect(() => (isSubmitted() && !pending() ? handleClose() : null));
  return (
    <Dialog
      size="sm"
      triggerType="button"
      triggerElm={<DeleteIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Delete Client: ${props.client.title}`}
      description={'Are you sure you want to delete this client?'}
      footerActions={
        <div class="w-100 d-flex justify-content-between mb-2 flex-row flex-nowrap">
          <Button class="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            type="submit"
            class="danger"
            disabled={pending() || isSubmitted()}
            onClick={() => handleSubmit()}
          >
            <Show when={!pending()} fallback={<LoadingIcon />}>
              Delete Client
            </Show>
          </Button>
        </div>
      }
    />
  );
};

export default ClientDeleteFormDialog;
