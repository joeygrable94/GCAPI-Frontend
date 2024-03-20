import { Nav } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { WebsiteRead } from '~/shared/api';
import { CreateIcon } from '~/shared/icons';
import { WebsiteSitemapCreateFormDialog } from '~/widgets/form-dialogs';

type WebsiteSitemapsActionsMenuProps = {
  website: WebsiteRead;
};

const WebsiteSitemapsActionsMenu: Component<WebsiteSitemapsActionsMenuProps> = (
  props
) => {
  return (
    <Nav class="my-2">
      <WebsiteSitemapCreateFormDialog
        website={props.website}
        triggerType="nav"
        triggerElm={
          <>
            <CreateIcon /> Add Sitemap
          </>
        }
      />
    </Nav>
  );
};

export default WebsiteSitemapsActionsMenu;
