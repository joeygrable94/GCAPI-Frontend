import { clientOnly } from '@solidjs/start';
import { Nav } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { CreateIcon } from '~/shared/icons';

const WebsiteCreateFormDialog = clientOnly(
  () => import('~/widgets/form-dialogs/website-create.ui')
);

// type WebsitesActionsMenuProps = {};

const WebsitesActionsMenu: Component = () => {
  return (
    <Nav class="my-2">
      <WebsiteCreateFormDialog
        triggerType="nav"
        triggerElm={
          <>
            <CreateIcon /> Create
          </>
        }
      />
    </Nav>
  );
};

export default WebsitesActionsMenu;
