import { Icon } from 'solid-heroicons';
import { arrowPath, eye, pencil, plusCircle, trash } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const EditIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon edit-icon ${props.classes}`} path={pencil} />;
};

export const CreateIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon create-icon ${props.classes}`} path={plusCircle} />;
};

export const ViewIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon view-icon ${props.classes}`} path={eye} />;
};

export const DeleteIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon delete-icon ${props.classes}`} path={trash} />;
};

export const ProcessIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon process-icon ${props.classes}`} path={arrowPath} />;
};
