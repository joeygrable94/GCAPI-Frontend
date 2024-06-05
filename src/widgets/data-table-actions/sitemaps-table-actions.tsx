import { useNavigate } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import {
  WebsiteMapProcessing,
  WebsiteMapRead,
  WebsiteSitemapsService
} from '~/shared/api';
import { ProcessIcon, ViewIcon } from '~/shared/icons';
import { log, logError } from '~/shared/utils';

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
  const handleProcessPages = () => {
    WebsiteSitemapsService.websiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet(
      {
        sitemapId: props.sitemap.id
      }
    )
      .then((r: WebsiteMapProcessing) => {
        log('Pages processed', r.task_id, r.url, r.website_id);
      })
      .catch((e) => {
        logError('Process Error', e);
      })
      .finally(() => {
        log('Process Complete');
      });
  };
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/sitemaps/${props.sitemap.id}`)}
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
      <WebsiteSitemapDeleteFormDialog sitemap={props.sitemap} />
    </Stack>
  );
};

export default WebsiteSitemapsTableActions;
