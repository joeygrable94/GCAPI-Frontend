import { Icon } from 'solid-heroicons';
import {
  arrowUpTray,
  check,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  xMark
} from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const FileUploadIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon file-upload-icon ${props.classes}`} path={arrowUpTray} />;
};

export const CaretSortIcon: Component<TIconProps> = (props) => {
  return (
    <div class="flex h-full flex-1 flex-col">
      <Icon class="relative h-1/2 w-auto" path={chevronUp} />
      <Icon class="relative h-1/2 w-auto" path={chevronDown} />
    </div>
  );
};

export const CheckIcon: Component<TIconProps> = (props) => {
  return <Icon class="h-auto w-auto" path={check} />;
};

export const CrossIcon: Component<TIconProps> = (props) => {
  return <Icon class={`relative h-5 ${props.classes}`} path={xMark} />;
};

export const ArrowUpIcon: Component<TIconProps> = (props) => {
  return <Icon class={`h-auto w-auto ${props.classes}`} path={chevronUp} />;
};

export const ArrowDownIcon: Component<TIconProps> = (props) => {
  return <Icon class={`h-auto w-auto ${props.classes}`} path={chevronDown} />;
};

export const ArrowRightIcon: Component<TIconProps> = (props) => {
  return <Icon class={`h-auto w-auto ${props.classes}`} path={chevronRight} />;
};

export const ArrowLeftIcon: Component<TIconProps> = (props) => {
  return <Icon class={`h-auto w-auto ${props.classes}`} path={chevronLeft} />;
};
