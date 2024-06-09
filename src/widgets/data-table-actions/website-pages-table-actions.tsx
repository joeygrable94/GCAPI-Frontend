import { useNavigate } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { WebsitePageRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';
import { KeywordCorpusIcon, PageSpeedInsightsIcon } from '~/shared/icons/process.icons';
const WebsitePageDeleteFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/website-page-delete.ui')
);

interface IWebsitePagesTableActionsProps {
  websitePage: WebsitePageRead;
}

const WebsitePagesTableActions: Component<IWebsitePagesTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() =>
          navigate(
            `/websites/${props.websitePage.website_id}/pages/${props.websitePage.id}`
          )
        }
      >
        <ViewIcon />
      </Button>
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => {
          console.log('Fetch Page Speed Insights');
        }}
      >
        <PageSpeedInsightsIcon />
      </Button>
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => {
          console.log('Fetch Page Keyword Corpus');
        }}
      >
        <KeywordCorpusIcon />
      </Button>
      <WebsitePageDeleteFormDialog websitePage={props.websitePage} />
    </Stack>
  );
};

export default WebsitePagesTableActions;
