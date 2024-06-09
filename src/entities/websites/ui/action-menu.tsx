import { Nav } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { CreateIcon } from '~/shared/icons';
import { WebsiteCreateFormDialog } from '~/widgets/form-dialogs';

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
