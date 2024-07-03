import { Image } from '@kobalte/core/image';
import { Component } from 'solid-js';

type AvatarProps = {
  src?: string;
  srcset?: string;
  alt?: string;
  width?: number;
  className?: string;
};

const AvatarImage: Component<AvatarProps> = (props) => {
  const width = props.width ?? 80;
  return (
    <Image>
      <Image.Img
        class={`mx-auto aspect-square w-auto rounded-full object-cover shadow ${props.className}`}
        src={props.src ?? 'https://www.gravatar.com/avatar/?d=identicon'}
        srcset={props.srcset}
        alt={props.alt ?? 'Avatar'}
        style={{ width: `${width}px` }}
      />
      <Image.Fallback class="aspect-square w-8 object-cover">A</Image.Fallback>
    </Image>
  );
};

export default AvatarImage;
