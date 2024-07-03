import { Pagination as KBPagination } from '@kobalte/core/pagination';
import { Show, children, createEffect, createSignal } from 'solid-js';
import { isServer } from 'solid-js/web';
import { PaginationProps } from './pagination.types';

export default function Pagination(props: PaginationProps) {
  const showPrevious = props.showPrevious ?? true;
  const showNext = props.showNext ?? true;
  const showFirst = props.showFirst ?? true;
  const showLast = props.showLast ?? true;
  const showSibling = props.siblingCount ?? 2;
  const defaultPage = props.defaultPage ?? 1;
  const previousText = children(() => (props.previous ? props.previous : 'Previous'));
  const nextText = children(() => (props.next ? props.next : 'Next'));
  const ellipsisText = children(() => (props.ellipsis ? props.ellipsis : '...'));
  const size = props.size || 'default';
  const color = props.color ?? 'default';
  const curve = props.curve || 'default';
  const pageStyleType = props.styleType ?? 'none';
  const pageColorKey = {
    default: {
      none: 'text-black border border-solid border-transparent hover:bg-gray-200 focus-visible:outline-gray-300 aria-[current=page]:bg-gray-200',
      fill: 'text-white bg-black border border-solid border-gray-900 hover:bg-gray-900 focus-visible:outline-gray-800 aria-[current=page]:bg-gray-700',
      outline:
        'text-black border border-solid border-gray-300 hover:bg-gray-200 focus-visible:outline-gray-300 aria-[current=page]:bg-gray-200'
    },
    info: {
      none: 'text-blue-700 border border-solid border-transparent hover:bg-blue-100 focus-visible:outline-blue-300 aria-[current=page]:bg-blue-100',
      fill: 'bg-blue-600 text-white hover:bg-blue-500 border border-solid border-blue-400 focus-visible:outline-blue-500 aria-[current=page]:bg-blue-400 aria-[current=page]:border-blue-500/50',
      outline:
        'bg-white text-blue-600 border border-solid border-blue-600 hover:bg-blue-50 focus-visible:outline-blue-300 aria-[current=page]:bg-blue-100 aria-[current=page]:border-blue-300'
    },
    error: {
      none: 'text-red-500 border border-solid border-transparent hover:bg-red-100 focus-visible:outline-red-300 aria-[current=page]:bg-red-100',
      fill: 'bg-red-600 text-white hover:bg-red-500 border border-solid border-red-600 focus-visible:outline-red-500 aria-[current=page]:bg-red-400 aria-[current=page]:border-red-500',
      outline:
        'bg-white text-red-600 border border-solid border-red-600 hover:bg-red-50 focus-visible:outline-red-300 aria-[current=page]:bg-red-100 aria-[current=page]:border-red-300'
    },
    warning: {
      none: 'text-yellow-500 border border-solid border-transparent hover:bg-yellow-100 focus-visible:outline-yellow-300 aria-[current=page]:bg-yellow-100',
      fill: 'bg-yellow-500 text-white hover:bg-yellow-400 border border-solid border-yellow-500 focus-visible:outline-yellow-500 aria-[current=page]:bg-yellow-400 aria-[current=page]:border-yellow-500/50',
      outline:
        'bg-white text-yellow-500 border border-solid border-yellow-500 hover:bg-yellow-50 focus-visible:outline-yellow-300 aria-[current=page]:bg-yellow-100 aria-[current=page]:border-yellow-300'
    },
    success: {
      none: 'text-green-500 border border-solid border-transparent hover:bg-green-100 focus-visible:outline-green-300 aria-[current=page]:bg-green-100',
      fill: 'bg-green-600 text-white hover:bg-green-500 border border-solid border-green-600 focus-visible:outline-green-500 aria-[current=page]:bg-green-500 aria-[current=page]:border-green-500/50',
      outline:
        'bg-white text-green-600 border border-solid border-green-600 hover:bg-green-50 focus-visible:outline-green-300 aria-[current=page]:bg-green-100 aria-[current=page]:border-green-300'
    },
    light: {
      none: 'text-gray-600 border border-solid border-transparent hover:bg-gray-200 focus-visible:outline-gray-300 aria-[current=page]:bg-gray-200',
      fill: 'bg-gray-100 text-gray-600 border border-solid border-gray-100 hover:bg-gray-300 focus-visible:outline-gray-300 aria-[current=page]:bg-gray-300',
      outline:
        'bg-white text-gray-600 border border-solid border-gray-300 hover:bg-gray-200 hover:text-gray-800 hover:border-gray-300 focus-visible:outline-gray-300 aria-[current=page]:bg-gray-200 aria-[current=page]:border-gray-300/50'
    },
    dark: {
      none: 'text-black border border-solid border-transparent hover:bg-gray-700 hover:text-gray-100 hover:border-gray-700 focus-visible:outline-gray-300 aria-[current=page]:text-gray-100 aria-[current=page]:bg-gray-700',
      fill: 'bg-gray-900 text-gray-50 hover:bg-gray-700 border border-solid border-gray-700 focus-visible:outline-gray-700 aria-[current=page]:bg-gray-700 aria-[current=page]:text-gray-100 aria-[current=page]:border-gray-700/50',
      outline:
        'bg-white text-black border border-solid border-gray-700 hover:bg-gray-700 hover:text-gray-100 hover:border-gray-700 focus-visible:outline-gray-300 aria-[current=page]:text-gray-100 aria-[current=page]:bg-gray-600 aria-[current=page]:border-gray-700/50'
    }
  };
  const pageItemEdgeCurve = {
    default: 'rounded',
    small: 'rounded',
    medium: 'rounded-md',
    large: 'rounded-lg',
    full: 'rounded-full',
    none: 'rounded-none'
  };
  const pageItemSizeKey = {
    default: 'px-4 py-2',
    small: 'px-4 py-1 text-sm',
    medium: 'px-6 py-3 text-lg',
    large: 'px-12 py-4 text-xl'
  };
  const [count, setCount] = createSignal<number>(
    typeof props.count === 'function' ? props.count() : props.count
  );
  const setPageCount = () =>
    typeof props.count === 'function' ? setCount(props.count()) : setCount(props.count);
  if (isServer) setPageCount();
  createEffect(() => setPageCount());
  const itemStyles = `inline-flex w-auto cursor-pointer appearance-none items-center justify-center tabular-nums outline-none transition-colors ${pageItemSizeKey[size]} ${pageItemEdgeCurve[curve]} ${pageColorKey[color][pageStyleType]} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`;
  return (
    <KBPagination
      class="pagination__root inline-flex items-center justify-between gap-2 [&>ul]:inline-flex [&>ul]:items-center [&>ul]:justify-between [&>ul]:gap-2"
      count={count()}
      defaultPage={defaultPage}
      page={props.page()}
      onPageChange={props.setPage}
      showFirst={showFirst}
      showLast={showLast}
      siblingCount={showSibling}
      fixedItems={props.fixedItems}
      disabled={props.disabled}
      itemComponent={(props) => (
        <KBPagination.Item class={`pagination__item ${itemStyles}`} page={props.page}>
          {props.page}
        </KBPagination.Item>
      )}
      ellipsisComponent={() => (
        <KBPagination.Ellipsis
          class={`pagination__ellipsis inline-flex w-auto cursor-default items-center justify-center outline-none ${pageItemSizeKey[size]} ${pageItemEdgeCurve[curve]}`}
        >
          {ellipsisText()}
        </KBPagination.Ellipsis>
      )}
    >
      <Show when={showPrevious}>
        <KBPagination.Previous class={`pagination__item ${itemStyles}`}>
          {previousText()}
        </KBPagination.Previous>
      </Show>
      <KBPagination.Items />
      <Show when={showNext}>
        <KBPagination.Next class={`pagination__item ${itemStyles}`}>
          {nextText()}
        </KBPagination.Next>
      </Show>
    </KBPagination>
  );
}
