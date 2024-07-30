import { Dialog } from '@getcommunity/gcui/dialog';
import { DeleteIcon, LoadingIcon } from '@getcommunity/gcui/icon';
import { Button } from '@kobalte/core/button';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { WebsiteRead, WebsitesService } from '~/shared/api';
import { queryClient } from '~/shared/tanstack';

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
      .then(() => {
        toast.success(`deleted website: ${props.website.domain}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error deleting website: ${e.message}`);
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
              Delete Website
            </Show>
          </Button>
        </div>
      }
    />
  );
};

export default WebsiteDeleteFormDialog;
