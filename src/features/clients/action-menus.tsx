import { Nav } from 'solid-bootstrap';
import { Component, createSignal } from 'solid-js';
import ModalCreateClient from '~/entities/clients/ui/modal-create';

type ActionsMenuClientsProps = {};

const ActionsMenuClients: Component<ActionsMenuClientsProps> = (props) => {
  const [openCreate, setOpenCreate] = createSignal(false);
  return (
    <Nav class="my-2">
      <Nav.Item>
        <Nav.Link onClick={() => setOpenCreate(true)}>Create</Nav.Link>
        <ModalCreateClient open={openCreate} setOpen={setOpenCreate} />
      </Nav.Item>
    </Nav>
  );
};

export default ActionsMenuClients;
