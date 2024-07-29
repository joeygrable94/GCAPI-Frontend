import { Icon } from 'solid-heroicons';
import { xMark } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const CloseIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon icon-close ${props.classes}`} path={xMark} />;
};
