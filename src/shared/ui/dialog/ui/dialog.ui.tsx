import { Button } from '@kobalte/core/button';
import { Dialog as KBDialog } from '@kobalte/core/dialog';
import { Match, ParentComponent, Show, Switch, children } from 'solid-js';
import { CloseIcon } from '~/shared/ui/icon';
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
  const dialogTrigger = children(() => props.triggerElm);
  const footerBody = children(() => props.children);
  const footerActions = children(() => props.footerActions);
  return (
    <KBDialog open={props.open()} onOpenChange={props.handleOpen}>
      <KBDialog.Trigger class="dialog__trigger inline-flex justify-between">
        <Switch>
          <Match when={props.triggerType === 'jsx'}>{dialogTrigger()}</Match>
          <Match when={props.triggerType === 'button'}>
            <DialogButton handleOpen={props.handleOpen} handleClose={props.handleClose}>
              {dialogTrigger()}
            </DialogButton>
          </Match>
          <Match when={props.triggerType === 'link'}>
            <DialogLink handleOpen={props.handleOpen} handleClose={props.handleClose}>
              {dialogTrigger()}
            </DialogLink>
          </Match>
          <Match when={props.triggerType === 'nav'}>
            <DialogNavLink
              handleOpen={props.handleOpen}
              handleClose={props.handleClose}
            >
              {dialogTrigger()}
            </DialogNavLink>
          </Match>
        </Switch>
      </KBDialog.Trigger>
      <KBDialog.Portal>
        <KBDialog.Overlay class="dialog__overlay fixed inset-0 animate-dialog-overlay-hide bg-dialog-overlay ui-expanded:animate-dialog-overlay-show" />
        <div class="dialog__positioner fixed inset-0 flex items-center justify-center">
          <KBDialog.Content
            // onEscapeKeyDown={props.handleClose}
            onPointerDownOutside={props.handleClose}
            // onFocusOutside={props.handleClose}
            // onInteractOutside={props.handleClose}
            class="dialog__content max-w-[min(calc(100vw-16px),500px)] animate-dialog-content-hide rounded-md border-x border-y border-gray-200 bg-white p-4 shadow-sm ui-expanded:animate-dialog-content-show"
          >
            <div class="dialog__header mb-3 flex items-center justify-between">
              <KBDialog.Title class="dialog__title text-lg">
                {props.title}
              </KBDialog.Title>
              <KBDialog.CloseButton
                class="dialog__close-button p-2 text-gray-700"
                onClick={props.handleClose}
              >
                <CloseIcon />
              </KBDialog.CloseButton>
            </div>
            <Show when={props.description}>
              <KBDialog.Description class="dialog__description">
                {props.description}
              </KBDialog.Description>
            </Show>
            <div class="dialog__body relative my-3">{footerBody()}</div>
            <div class="dialog__footer flex items-baseline justify-between">
              <Switch>
                <Match when={showFooterActions()}>{footerActions()}</Match>
                <Match when={!showFooterActions()}>
                  <Button class="secondary" onClick={props.handleClose}>
                    Close
                  </Button>
                </Match>
              </Switch>
            </div>
          </KBDialog.Content>
        </div>
      </KBDialog.Portal>
    </KBDialog>
  );
};

export default Dialog;
