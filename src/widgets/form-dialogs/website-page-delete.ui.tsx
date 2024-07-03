import { Button } from '@kobalte/core/button';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { WebsitePageRead, WebsitePagesService } from '~/shared/api';
import { queryClient } from '~/shared/tanstack';
import { Dialog } from '~/shared/ui/dialog';
import { DeleteIcon, LoadingIcon } from '~/shared/ui/icon';

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
      .then(() => {
        toast.success(`deleted website page: ${props.websitePage.url}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error deleting website page: ${e.message}`);
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
              Delete Website Page
            </Show>
          </Button>
        </div>
      }
    />
  );
};

export default WebsitePageDeleteFormDialog;
