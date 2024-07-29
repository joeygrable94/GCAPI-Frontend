import { Breadcrumbs as KBBreadcrumbs } from '@kobalte/core/breadcrumbs';
import { For, JSX, Show } from 'solid-js';

export type BreadcrumbsProps = {
  items: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
  }>;
  separator?: JSX.Element | Element | string;
};

export default function Breadcrumbs(props: BreadcrumbsProps) {
  const totalItems = props.items.length;
  return (
    <KBBreadcrumbs separator={props.separator ?? '/'}>
      <ol class="breadcrumbs__list inline-flex items-center">
        <For each={props.items}>
          {(item, index) => (
            <li class="breadcrumbs__item inline-flex items-center">
              <KBBreadcrumbs.Link
                class="breadcrumbs__link text-gray-800 hover:text-blue-600 ui-disabled:text-gray-600 ui-current:font-medium"
                href={item.href}
                onClick={item.onClick}
                current={index() === totalItems - 1}
              >
                {item.label}
              </KBBreadcrumbs.Link>
              <Show when={index() < totalItems - 1}>
                <KBBreadcrumbs.Separator class="breadcrumbs__separator mx-1 my-0 inline-flex h-5 w-5 items-center justify-center" />
              </Show>
            </li>
          )}
        </For>
      </ol>
    </KBBreadcrumbs>
  );
}
