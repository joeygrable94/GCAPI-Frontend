import { Separator as KBSeparator } from '@kobalte/core/separator';
import { createMemo } from 'solid-js';

export type SeparatorProps = {
  orientation: 'horizontal' | 'vertical';
  size?: number;
  weight?: number;
  align?: 'start' | 'center' | 'end';
  rounded?: boolean;
};

export default function Separator(props: SeparatorProps) {
  const size = props.size ? `${props.size}%` : '100%';
  const weight = props.weight ? `${props.weight}px` : '1px';
  const sepSizes = createMemo(() => {
    let classprops: any = {};
    if (props.orientation === 'horizontal') {
      if (props.align === 'start') {
        classprops['margin-right'] = 'auto';
        classprops['margin-left'] = '0';
      } else if (props.align === 'center') {
        classprops['margin-right'] = 'auto';
        classprops['margin-left'] = 'auto';
      } else if (props.align === 'end') {
        classprops['margin-right'] = '0';
        classprops['margin-left'] = 'auto';
      }
      classprops.width = size;
      classprops.height = weight;
    } else if (props.orientation === 'vertical') {
      if (props.align === 'start') {
        classprops['margin-top'] = '0';
        classprops['margin-bottom'] = 'auto';
      } else if (props.align === 'center') {
        classprops['margin-top'] = 'auto';
        classprops['margin-bottom'] = 'auto';
      } else if (props.align === 'end') {
        classprops['margin-top'] = 'auto';
        classprops['margin-bottom'] = '0';
      }
      classprops.width = weight;
      classprops.height = size;
    } else {
      classprops.width = size;
      classprops.height = weight;
    }
    if (props.rounded) {
      classprops['border-radius'] = '9999px';
    }
    return classprops;
  });
  return (
    <KBSeparator
      class="separator inline-flex border-none bg-gray-200 dark:bg-gray-800"
      orientation={props.orientation}
      style={sepSizes()}
    />
  );
}
