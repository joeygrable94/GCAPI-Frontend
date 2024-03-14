import { Accessor, JSX, Setter } from 'solid-js';
import { BOOSTRAP_CONTEXTUAL_VARIANT } from '~/providers/theme';

export type DialogProps = {
  open: Accessor<boolean>;
  setOpen: Setter<boolean>;
  handleOpen: () => void;
  handleClose: () => void;
  size?: 'sm' | 'lg' | 'xl';
  triggerType: 'button' | 'link' | 'nav' | 'jsx';
  triggerElm: JSX.Element;
  variant?: BOOSTRAP_CONTEXTUAL_VARIANT;
  showCloseButton?: boolean;
  title: JSX.Element | string;
  description?: JSX.Element | string;
  footerActions?: JSX.Element;
  formSubmit?: () => Promise<void>;
};

export type DialogButtonProps = {
  handleOpen: () => void;
  handleClose: () => void;
  variant?: BOOSTRAP_CONTEXTUAL_VARIANT;
};

export type DialogLinkProps = {
  handleOpen: () => void;
  handleClose: () => void;
};
