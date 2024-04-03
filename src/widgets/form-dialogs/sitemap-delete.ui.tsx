import { Button, Spinner, Stack } from 'solid-bootstrap';
import { Component, Match, Switch, createSignal } from 'solid-js';
import { Dialog } from '~/features/dialogs';
import { WebsiteMapRead, WebsiteSitemapsService } from '~/shared/api';
import { DeleteIcon } from '~/shared/icons';
import { log } from '~/shared/utils';

type WebsiteSitemapDeleteFormDialogProps = {
  sitemap: WebsiteMapRead;
};

const WebsiteSitemapDeleteFormDialog: Component<WebsiteSitemapDeleteFormDialogProps> = (
  props
) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const handleSubmit = () => {
    setPending(true);
    WebsiteSitemapsService.websiteSitemapsDeleteApiV1SitemapsSitemapIdDelete({
      sitemapId: props.sitemap.id
    })
      .then((v: any) => {
        log('deleted sitemap response', v);
        setIsSubmitted(true);
        handleClose();
      })
      .catch((e) => {
        log('error deleting sitemap', e);
        setIsSubmitted(false);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Dialog
      size="sm"
      triggerType="button"
      triggerElm={<DeleteIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Delete Sitemap: ${props.sitemap.url}`}
      description={'Are you sure you want to delete this sitemap?'}
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
              <Match when={!pending()}>Delete Sitemap</Match>
            </Switch>
          </Button>
        </Stack>
      }
    />
  );
};

export default WebsiteSitemapDeleteFormDialog;