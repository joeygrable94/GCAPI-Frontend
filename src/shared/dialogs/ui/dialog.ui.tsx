import { Button, Modal } from 'solid-bootstrap';
import { Match, ParentComponent, Show, Switch, children } from 'solid-js';
import { DialogProps } from '../model/dialog.types';
import DialogButton from './dialog.button.ui';
import DialogLink from './dialog.link.ui';
import DialogNavLink from './dialog.navlink.ui';

const Dialog: ParentComponent<DialogProps> = (props) => {
  const showFooterActions = (): boolean => {
    // check if the props.footerActions is defined
    // return true if not undefined, false otherwise
    return props.footerActions ? true : false;
  };
  const footerBody = children(() => props.children);
  const footerActions = children(() => props.footerActions);
  return (
    <>
      <Switch>
        <Match when={props.triggerType === 'jsx'}>{props.triggerElm}</Match>
        <Match when={props.triggerType === 'button'}>
          <DialogButton handleOpen={props.handleOpen} handleClose={props.handleClose}>
            {props.triggerElm}
          </DialogButton>
        </Match>
        <Match when={props.triggerType === 'link'}>
          <DialogLink handleOpen={props.handleOpen} handleClose={props.handleClose}>
            {props.triggerElm}
          </DialogLink>
        </Match>
        <Match when={props.triggerType === 'nav'}>
          <DialogNavLink handleOpen={props.handleOpen} handleClose={props.handleClose}>
            {props.triggerElm}
          </DialogNavLink>
        </Match>
      </Switch>
      <Modal
        centered
        show={props.open()}
        onHide={props.handleClose}
        size={props.size ?? 'sm'}
      >
        <Modal.Header closeButton={props.showCloseButton ?? true}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Show when={props.description}>
            <p>{props.description}</p>
          </Show>
          {footerBody()}
        </Modal.Body>
        <Modal.Footer>
          <Switch>
            <Match when={showFooterActions()}>{footerActions()}</Match>
            <Match when={!showFooterActions()}>
              <Button variant="secondary" onClick={props.handleClose}>
                Close
              </Button>
            </Match>
          </Switch>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dialog;
