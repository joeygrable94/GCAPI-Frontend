import { Nav } from 'solid-bootstrap';
import { Component, createSignal } from 'solid-js';
import { ModalCreateWebsite } from '~/entities/websites/ui';

type ActionsMenuWebsitesProps = {};

const ActionsMenuWebsites: Component<ActionsMenuWebsitesProps> = (props) => {
  const [openCreate, setOpenCreate] = createSignal(false);
  return (
    <Nav activeKey="#create-website" class="my-2">
      <Nav.Item>
        <Nav.Link onClick={() => setOpenCreate(true)}>Create</Nav.Link>
        <ModalCreateWebsite open={openCreate} setOpen={setOpenCreate} />
      </Nav.Item>
    </Nav>
  );
};

export default ActionsMenuWebsites;
