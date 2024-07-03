import { Link as KBLink } from '@kobalte/core/link';
import { children } from 'solid-js';
import { LinkProps } from './link.types';

function getLinkStyle(
  isBold: boolean | undefined,
  isItalic: boolean | undefined,
  isUnderline: boolean | undefined,
  isOverline: boolean | undefined,
  isLineThrough: boolean | undefined
): string {
  let classString = '';
  const linkStyle = {
    default: 'hover:underline ui-disabled:no-underline',
    underline: 'underline',
    italic: 'italic',
    bold: 'font-bold',
    lineThrough: 'line-through',
    overline: 'overline'
  };
  if (isBold)
    classString
      ? (classString += ' ' + linkStyle.bold)
      : (classString = linkStyle.bold);
  if (isItalic)
    classString
      ? (classString += ' ' + linkStyle.italic)
      : (classString = linkStyle.italic);
  if (isUnderline)
    classString
      ? (classString += ' ' + linkStyle.underline)
      : (classString = linkStyle.underline);
  else if (isOverline)
    classString
      ? (classString += ' ' + linkStyle.overline)
      : (classString = linkStyle.overline);
  else if (isLineThrough)
    classString
      ? (classString += ' ' + linkStyle.lineThrough)
      : (classString = linkStyle.lineThrough);
  if (classString === '') classString = linkStyle.default;
  return classString;
}

export default function Link(props: LinkProps) {
  const color = props.color ? props.color : 'info';
  const className = props.className ? props.className : '';
  const linkStyle = getLinkStyle(
    props.bold,
    props.italic,
    props.underline,
    props.overline,
    props.lineThrough
  );
  const linkColorKey = {
    info: 'text-blue-500 ui-disabled:text-blue-300',
    error: 'text-red-700 ui-disabled:text-red-300',
    warning: 'text-yellow-500 ui-disabled:text-yellow-300',
    success: 'text-green-600 ui-disabled:text-green-600/60',
    light: 'text-gray-500 ui-disabled:text-gray-400/80',
    dark: 'text-black ui-disabled:text-black/50'
  };
  const linkText = children(() => props.children);
  return (
    <KBLink
      href={props.href}
      class={`link ${className} ${linkColorKey[color]} ${linkStyle} ui-disabled:cursor-not-allowed`}
      disabled={props.disabled}
    >
      {linkText()}
    </KBLink>
  );
}
