import { Icon } from 'solid-heroicons';
import { beaker, bookOpen } from 'solid-heroicons/outline';
import { Component } from 'solid-js';
import { TIconProps } from './icons.types';

export const PageSpeedInsightsIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon edit-website-psi ${props.classes}`} path={beaker} />;
};

export const KeywordCorpusIcon: Component<TIconProps> = (props) => {
  return <Icon class={`icon edit-website-kwc ${props.classes}`} path={bookOpen} />;
};
