import { Icon } from 'solid-heroicons';
import { arrowPath, arrowUpTray, checkCircle } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const FileUploadIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon file-upload-icon ${props.classes}`} path={arrowUpTray} />;
};

export const IsProcessedIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon processed-icon ${props.classes}`} path={checkCircle} />;
};

export const IsNotProcessedIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon processed-icon ${props.classes}`} path={arrowPath} />;
};
