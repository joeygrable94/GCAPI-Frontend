import { Icon } from 'solid-heroicons';
import {
  chevronDoubleDown,
  chevronDoubleLeft,
  chevronDoubleRight,
  chevronDoubleUp,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp
} from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const KeyboardArrowUpIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronUp} />;
};

export const KeyboardArrowDownIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronDown} />;
};

export const KeyboardArrowLeftIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronLeft} />;
};

export const KeyboardArrowRightIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronRight} />;
};

export const KeyboardDoubleArrowUpIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronDoubleUp} />;
};

export const KeyboardDoubleArrowDownIcon: Component<TIconProps> = (props) => {
  return (
    <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronDoubleDown} />
  );
};

export const KeyboardDoubleArrowLeftIcon: Component<TIconProps> = (props) => {
  return (
    <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronDoubleLeft} />
  );
};

export const KeyboardDoubleArrowRightIcon: Component<TIconProps> = (props) => {
  return (
    <Icon class={`icon keyboard-arrow ${props.classes}`} path={chevronDoubleRight} />
  );
};
