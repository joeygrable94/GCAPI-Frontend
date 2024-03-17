import { Icon } from 'solid-heroicons';
import { arrowUpTray } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const FileUploadIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon file-upload-icon ${props.classes}`} path={arrowUpTray} />;
};
