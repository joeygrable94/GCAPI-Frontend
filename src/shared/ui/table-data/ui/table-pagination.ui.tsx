import { Button } from '@kobalte/core/button';
import { Icon } from 'solid-heroicons';
import {
  chevronDoubleLeft,
  chevronDoubleRight,
  chevronLeft,
  chevronRight
} from 'solid-heroicons/outline';
import { Component, For, Show, createEffect, createSignal } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { FormControlChangeEvent, SelectChangeEvent } from '~/shared/ui/form-input';
import {
  ITablePaginationProps,
  getNextHighestPageInterval
} from '~/shared/ui/table-data';

/**
 * @summary Filter component for table columns.
 */
export const TablePagination: Component<ITablePaginationProps> = (props) => {
  const [theme] = useTheme();
  const displayPageSizeInterval = [10, 20, 30, 40, 50, 100, 1000];
  const [pageInterval, setPageInterval] = createSignal<number>(10);
  const [displayInterval, setPageDisplayInterval] = createSignal<number[]>([10]);
  const handleChangePageSize = (e: SelectChangeEvent) => {
    props.table.setPageSize(Number(e.target.value));
  };
  const handleChangePageNumber = (e: FormControlChangeEvent) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    props.table.setPageIndex(page);
  };
  createEffect(() =>
    setPageInterval(
      getNextHighestPageInterval(displayPageSizeInterval, props.maximum())
    )
  );
  createEffect(() =>
    setPageDisplayInterval(displayPageSizeInterval.filter((v) => v <= pageInterval()))
  );
  return (
    <Show when={props.maximum() > displayPageSizeInterval[0]}>
      <div class="justify-content-between align-items-center flex flex-row flex-nowrap">
        <div class="inline-block w-1/5">
          <Button
            class={theme.darkMode ? 'outline-light' : 'outline-dark'}
            onClick={() => props.table.setPageIndex(0)}
            disabled={!props.table.getCanPreviousPage()}
          >
            <Icon path={chevronDoubleLeft} class="icon" />
          </Button>
          <Button
            class={theme.darkMode ? 'outline-light' : 'outline-dark'}
            onClick={() => props.table.previousPage()}
            disabled={!props.table.getCanPreviousPage()}
          >
            <Icon path={chevronLeft} class="icon" />
          </Button>
          <Button
            class={theme.darkMode ? 'outline-light' : 'outline-dark'}
            onClick={() => props.table.nextPage()}
            disabled={!props.table.getCanNextPage()}
          >
            <Icon path={chevronRight} class="icon" />
          </Button>
          <Button
            class={theme.darkMode ? 'outline-light' : 'outline-dark'}
            onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
            disabled={!props.table.getCanNextPage()}
          >
            <Icon path={chevronDoubleRight} class="icon" />
          </Button>
        </div>
        <div class="inline-block w-2/5 text-center">
          Page {props.table.getState().pagination.pageIndex + 1} of{' '}
          {props.table.getPageCount()} &mdash; {props.table.getRowModel().rows.length}{' '}
          Rows
        </div>
        <div class="justify-content-end align-items-center inline-flex w-2/5">
          <label
            id="users-table-pagination-go-to-page-label"
            for="users-table-pagination-go-to-page-input"
            class="d-flex justify-content-end align-items-center mb-0 px-1"
          >
            Go To
          </label>
          <input
            id="users-table-pagination-go-to-page-input"
            type="number"
            size="sm"
            style={{ 'max-width': '50px' }}
            value={props.table.getState().pagination.pageIndex + 1}
            onChange={handleChangePageNumber}
          />
          <label
            id="users-table-pagination-size-label"
            form="users-table-pagination-size-select"
            class="d-flex justify-content-end align-items-center mb-0 px-1"
          >
            Page Size
          </label>
          <select
            id="users-table-pagination-size-select"
            size="sm"
            style={{ 'max-width': '100px' }}
            value={props.table.getState().pagination.pageSize}
            onChange={handleChangePageSize}
          >
            <For each={displayInterval()}>
              {(pageSize) => <option value={pageSize}>Show {pageSize}</option>}
            </For>
          </select>
        </div>
      </div>
    </Show>
  );
};
