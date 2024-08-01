import { Dialog } from '@getcommunity/gcui/dialog';
import { DeleteIcon, LoadingIcon } from '@getcommunity/gcui/icon';
import { Button } from '@kobalte/core/button';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { WebsiteMapRead, WebsiteSitemapsService } from '~/shared/api';
import { queryClient } from '~/shared/tanstack';

type WebsiteSitemapDeleteFormDialogProps = {
  sitemap: WebsiteMapRead;
};

const WebsiteSitemapDeleteFormDialog: Component<WebsiteSitemapDeleteFormDialogProps> = (
  props
) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['websiteSitemaps'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const handleSubmit = () => {
    setPending(true);
    WebsiteSitemapsService.websiteSitemapsDeleteApiV1SitemapsSitemapIdDelete({
      sitemapId: props.sitemap.id,
    })
      .then(() => {
        toast.success(`deleted sitemap: ${props.sitemap.url}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error deleting sitemap: ${e.message}`);
        setIsSubmitted(false);
      })
      .finally(() => {
        setPending(false);
      });
  };
  createEffect(() => (isSubmitted() && !pending() ? handleClose() : null));
  return (
    <Dialog
      size='sm'
      triggerType='button'
      triggerElm={<DeleteIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Delete Sitemap: ${props.sitemap.url}`}
      description={'Are you sure you want to delete this sitemap?'}
      footerActions={
        <div class='w-100 d-flex justify-content-between mb-2 flex-row flex-nowrap'>
          <Button class='secondary' onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            type='submit'
            class='danger'
            disabled={pending() || isSubmitted()}
            onClick={() => handleSubmit()}
          >
            <Show when={!pending()} fallback={<LoadingIcon />}>
              Delete Sitemap
            </Show>
          </Button>
        </div>
      }
    />
  );
};

export default WebsiteSitemapDeleteFormDialog;
