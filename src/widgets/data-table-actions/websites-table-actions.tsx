import { Button } from '@kobalte/core/button';
import { useNavigate } from '@solidjs/router';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { WebsiteRead } from '~/shared/api';
import { ViewIcon } from '~/shared/ui/icon';
import { WebsiteDeleteFormDialog, WebsiteEditFormDialog } from '~/widgets/form-dialogs';

interface IWebsitesTableActionsProps {
  website: WebsiteRead;
}

const WebsitesTableActions: Component<IWebsitesTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  return (
    <div class="d-flex flex-gap-2 flex-row flex-nowrap">
      <Button
        class={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/websites/${props.website.id}`)}
      >
        <ViewIcon />
      </Button>
      <WebsiteEditFormDialog website={props.website} />
      <WebsiteDeleteFormDialog website={props.website} />
    </div>
  );
};

export default WebsitesTableActions;
