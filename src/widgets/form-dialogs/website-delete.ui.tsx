import { Button, Spinner, Stack } from 'solid-bootstrap';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import { WebsiteRead, WebsitesService } from '~/shared/api';
import { Dialog } from '~/shared/dialogs';
import { DeleteIcon } from '~/shared/icons';
import { queryClient } from '~/shared/tanstack';
import { log } from '~/shared/utils';

type WebsiteDeleteFormDialogProps = {
  website: WebsiteRead;
};

const WebsiteDeleteFormDialog: Component<WebsiteDeleteFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['websites'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const handleSubmit = () => {
    setPending(true);
    WebsitesService.websitesDeleteApiV1WebsitesWebsiteIdDelete({
      websiteId: props.website.id
    })
      .then((v: unknown) => {
        log('deleted website response', v);
        setIsSubmitted(true);
      })
      .catch((e) => {
        log('error deleting website', e);
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
      title={`Delete Website: ${props.website.domain}`}
      description={'Are you sure you want to delete this website?'}
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
              <Match when={!pending()}>Delete Website</Match>
            </Switch>
          </Button>
        </Stack>
      }
    />
  );
};

export default WebsiteDeleteFormDialog;
