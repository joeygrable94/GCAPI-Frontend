import { Icon } from 'solid-heroicons';
import { arrowPath, checkBadge, checkCircle, xCircle } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const IsProcessedIcon: Component<TIconProps> = (props) => {
  return (
    <Icon
      class={`icon text-success isprocessed-icon ${props.classes}`}
      path={checkCircle}
    />
  );
};

export const IsNotProcessedIcon: Component<TIconProps> = (props) => {
  return (
    <Icon
      class={`icon text-danger isnotprocessed-icon ${props.classes}`}
      path={arrowPath}
    />
  );
};

export const IsActiveIcon: Component<TIconProps> = (props) => {
  return (
    <Icon
      class={`icon isactive-icon text-success ${props.classes}`}
      path={checkBadge}
    />
  );
};

export const IsNotActiveIcon: Component<TIconProps> = (props) => {
  return (
    <Icon class={`icon isnotactive-icon text-danger ${props.classes}`} path={xCircle} />
  );
};
