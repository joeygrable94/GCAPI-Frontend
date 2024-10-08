import { Button } from '@kobalte/core/button';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { WebsitePageRead } from '~/shared/api';
import { KeywordCorpusIcon, PageSpeedInsightsIcon, ViewIcon } from '~/shared/ui/icon';
import { WebsitePageDeleteFormDialog } from '~/widgets/form-dialogs';

interface IWebsitePagesTableActionsProps {
  websitePage: WebsitePageRead;
}

const WebsitePagesTableActions: Component<IWebsitePagesTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  return (
    <div class="d-flex flex-gap-2 flex-row flex-nowrap">
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() =>
          navigate(
            `/websites/${props.websitePage.website_id}/pages/${props.websitePage.id}`
          )
        }
      >
        <ViewIcon />
      </Button>
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => {
          console.log('Fetch Page Speed Insights');
        }}
      >
        <PageSpeedInsightsIcon />
      </Button>
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => {
          console.log('Fetch Page Keyword Corpus');
        }}
      >
        <KeywordCorpusIcon />
      </Button>
      <WebsitePageDeleteFormDialog websitePage={props.websitePage} />
    </div>
  );
};

export default WebsitePagesTableActions;
