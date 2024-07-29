import { Icon } from 'solid-heroicons';
import { rocketLaunch } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const LoadingIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon loading-icon ${props.classes}`} path={rocketLaunch} />;
};
