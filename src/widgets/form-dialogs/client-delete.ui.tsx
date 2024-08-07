import { Button, Spinner, Stack } from 'solid-bootstrap';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { ClientDelete, ClientRead, ClientsService } from '~/shared/api';
import { Dialog } from '~/shared/dialogs';
import { DeleteIcon } from '~/shared/icons';
import { queryClient } from '~/shared/tanstack';

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
        <Stack class="w-100 mb-2 d-flex flex-row flex-nowrap justify-content-between">
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            type="submit"
            variant="danger"
            disabled={pending() || isSubmitted()}
            onClick={() => handleSubmit()}
          >
            <Switch>
              <Match when={pending()}>
                <Spinner size="sm" animation="border" />
              </Match>
              <Match when={!pending()}>Delete Client</Match>
            </Switch>
          </Button>
        </Stack>
      }
    />
  );
};

export default ClientDeleteFormDialog;
