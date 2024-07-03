import { Button } from '@kobalte/core/button';
import { useNavigate } from '@solidjs/router';
import { Component, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { useTheme } from '~/providers/theme';
import {
  WebsiteMapProcessing,
  WebsiteMapRead,
  WebsiteSitemapsService
} from '~/shared/api';
import { ProcessIcon, ViewIcon } from '~/shared/ui/icon';
import { WebsiteSitemapDeleteFormDialog } from '~/widgets/form-dialogs';

interface IWebsiteSitemapsTableActionsProps {
  sitemap: WebsiteMapRead;
}

const WebsiteSitemapsTableActions: Component<IWebsiteSitemapsTableActionsProps> = (
  props
) => {
  const [theme] = useTheme();
  // const [, taskAct] = useTasksManager();
  const navigate = useNavigate();
  const [sitemap, setSitemap] = createSignal<WebsiteMapRead>(props.sitemap);
  const handleProcessPages = () => {
    WebsiteSitemapsService.websiteSitemapsProcessSitemapPagesApiV1SitemapsSitemapIdProcessPagesGet(
      {
        sitemapId: sitemap().id
      }
    )
      .then((r: WebsiteMapProcessing) => {
        // if (r.task_id) taskAct.queueTask(r.task_id);
        toast.success(`processing pages: ${r.url}`);
      })
      .catch((e) => {
        toast.error(`process Error: ${e.message}`);
      });
  };
  createEffect(() => setSitemap(props.sitemap));
  return (
    <div class="d-flex flex-gap-2 flex-row flex-nowrap">
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/sitemaps/${sitemap().id}`)}
      >
        <ViewIcon />
      </Button>
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => handleProcessPages()}
      >
        <ProcessIcon />
      </Button>
      <WebsiteSitemapDeleteFormDialog sitemap={sitemap()} />
    </div>
  );
};

export default WebsiteSitemapsTableActions;
