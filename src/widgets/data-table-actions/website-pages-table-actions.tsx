import { useNavigate } from '@solidjs/router';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useThemeContext } from '~/features/theme';
import { WebsitePageRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';
import { KeywordCorpusIcon, PageSpeedInsightsIcon } from '~/shared/icons/process.icons';
import { log } from '~/shared/utils';
import { WebsitePageDeleteFormDialog } from '../form-dialogs';

interface IWebsitePagesTableActionsProps {
  websitePage: WebsitePageRead;
}

const WebsitePagesTableActions: Component<IWebsitePagesTableActionsProps> = (props) => {
  const theme = useThemeContext();
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
          log('Fetch Page Speed Insights');
        }}
      >
        <PageSpeedInsightsIcon />
      </Button>
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => {
          log('Fetch Page Keyword Corpus');
        }}
      >
        <KeywordCorpusIcon />
      </Button>
      <WebsitePageDeleteFormDialog websitePage={props.websitePage} />
    </Stack>
  );
};

export default WebsitePagesTableActions;
