import { useNavigate } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Button, Stack } from 'solid-bootstrap';
import { Component, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { useTheme } from '~/providers/theme';
import {
  WebsiteMapProcessing,
  WebsiteMapRead,
  WebsiteSitemapsService
} from '~/shared/api';
import { ProcessIcon, ViewIcon } from '~/shared/icons';

const WebsiteSitemapDeleteFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/sitemap-delete.ui')
);

interface IWebsiteSitemapsTableActionsProps {
  sitemap: WebsiteMapRead;
}

const WebsiteSitemapsTableActions: Component<IWebsiteSitemapsTableActionsProps> = (
  props
) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  const [sitemap, setSitemap] = createSignal<WebsiteMapRead>(props.sitemap);
  const handleProcessPages = () => {
    WebsiteSitemapsService.websiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet(
      {
        sitemapId: sitemap().id
      }
    )
      .then((r: WebsiteMapProcessing) => {
        toast.success(`pages processed: ${r.url}`);
      })
      .catch((e) => {
        toast.error(`process Error: ${e.message}`);
      });
  };
  createEffect(() => setSitemap(props.sitemap));
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/sitemaps/${sitemap().id}`)}
      >
        <ViewIcon />
      </Button>
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => handleProcessPages()}
      >
        <ProcessIcon />
      </Button>
      <WebsiteSitemapDeleteFormDialog sitemap={sitemap()} />
    </Stack>
  );
};

export default WebsiteSitemapsTableActions;
