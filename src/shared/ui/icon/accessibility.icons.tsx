import { Icon } from 'solid-heroicons';
import { speakerWave, speakerXMark } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const AudioOn: Component<TIconProps> = (props) => {
  const size = props.size ?? 'default';
  const sizeKey = {
    default: 'h-6',
    small: 'h-4',
    medium: 'h-8',
    large: 'h-12'
  };
  return (
    <Icon
      class={`icon-audio-on w-auto ${sizeKey[size]} ${props.classes}`}
      path={speakerWave}
    />
  );
};

export const AudioOff: Component<TIconProps> = (props) => {
  const size = props.size ?? 'default';
  const sizeKey = {
    default: 'h-6',
    small: 'h-4',
    medium: 'h-8',
    large: 'h-12'
  };
  return (
    <Icon
      class={`icon-audio-off w-auto ${sizeKey[size]} ${props.classes}`}
      path={speakerXMark}
    />
  );
};
