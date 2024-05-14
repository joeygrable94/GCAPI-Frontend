import { Button, Spinner, Stack } from 'solid-bootstrap';
import { Component, Match, Switch, createEffect, createSignal } from 'solid-js';
import { WebsitePageRead, WebsitePagesService } from '~/shared/api';
import { Dialog } from '~/shared/dialogs';
import { DeleteIcon } from '~/shared/icons';
import { queryClient } from '~/shared/tanstack';
import { log } from '~/shared/utils';

type WebsitePageDeleteFormDialogProps = {
  websitePage: WebsitePageRead;
};

const WebsitePageDeleteFormDialog: Component<WebsitePageDeleteFormDialogProps> = (
  props
) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['websitePages'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const handleSubmit = () => {
    setPending(true);
    WebsitePagesService.websitePagesDeleteApiV1WebpagesPageIdDelete({
      pageId: props.websitePage.id
    })
      .then((v: any) => {
        log('deleted Page response', v);
        setIsSubmitted(true);
      })
      .catch((e) => {
        log('error deleting Page', e);
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
      title={`Delete Website Page: ${props.websitePage.url}`}
      description={'Are you sure you want to delete this Website Page?'}
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
              <Match when={!pending()}>Delete Website Page</Match>
            </Switch>
          </Button>
        </Stack>
      }
    />
  );
};

export default WebsitePageDeleteFormDialog;
