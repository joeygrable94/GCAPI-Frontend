import { useNavigate } from '@solidjs/router';
import { clientOnly } from '@solidjs/start';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { WebsiteRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';

const WebsiteDeleteFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/website-delete.ui')
);
const WebsiteEditFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/website-delete.ui')
);

interface IWebsitesTableActionsProps {
  website: WebsiteRead;
}

const WebsitesTableActions: Component<IWebsitesTableActionsProps> = (props) => {
  const [theme] = useTheme();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/websites/${props.website.id}`)}
      >
        <ViewIcon />
      </Button>
      <WebsiteEditFormDialog website={props.website} />
      <WebsiteDeleteFormDialog website={props.website} />
    </Stack>
  );
};

export default WebsitesTableActions;
