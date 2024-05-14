import { Button, ButtonGroup, ButtonToolbar, Form, Stack } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import {
  chevronDoubleLeft,
  chevronDoubleRight,
  chevronLeft,
  chevronRight
} from 'solid-heroicons/outline';
import { Component, Show, createEffect, createSignal } from 'solid-js';
import { useThemeContext } from '~/features/theme';
import {
  ITablePaginationProps,
  getNextHighestPageInterval
} from '~/shared/data-tables';

/**
 * @summary Filter component for table columns.
 */
export const TablePagination: Component<ITablePaginationProps> = (props) => {
  const theme = useThemeContext();
  const displayPageSizeInterval = [10, 20, 30, 40, 50, 100, 1000];
  const [pageInterval, setPageInterval] = createSignal<number>(10);
  const handleChangePageSize = (e: any) => {
    props.table.setPageSize(Number(e.target.value));
  };
  const handleChangePageNumber = (e: any) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    props.table.setPageIndex(page);
  };
  createEffect(() =>
    setPageInterval(
      getNextHighestPageInterval(displayPageSizeInterval, props.maximum())
    )
  );
  return (
    <Show when={props.maximum() > displayPageSizeInterval[0]}>
      <Stack
        direction="horizontal"
        class="d-flex justify-content-between align-items-center flex-nowrap"
      >
        <ButtonToolbar class="w-20 inline-block">
          <ButtonGroup size="sm">
            <Button
              variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => props.table.setPageIndex(0)}
              disabled={!props.table.getCanPreviousPage()}
            >
              <Icon path={chevronDoubleLeft} class="icon" />
            </Button>
            <Button
              variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => props.table.previousPage()}
              disabled={!props.table.getCanPreviousPage()}
            >
              <Icon path={chevronLeft} class="icon" />
            </Button>
            <Button
              variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => props.table.nextPage()}
              disabled={!props.table.getCanNextPage()}
            >
              <Icon path={chevronRight} class="icon" />
            </Button>
            <Button
              variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => props.table.setPageIndex(props.table.getPageCount() - 1)}
              disabled={!props.table.getCanNextPage()}
            >
              <Icon path={chevronDoubleRight} class="icon" />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Form.Group class="w-30 inline-block text-center">
          Page {props.table.getState().pagination.pageIndex + 1} of{' '}
          {props.table.getPageCount()} &mdash; {props.table.getRowModel().rows.length}{' '}
          Rows
        </Form.Group>
        <Form.Group class="w-70 inline-block d-flex justify-content-end align-items-center">
          <Form.Label
            id="users-table-pagination-go-to-page-label"
            htmlFor="users-table-pagination-go-to-page-input"
            class="d-flex justify-content-end align-items-center mb-0 px-1"
          >
            Go To
          </Form.Label>
          <Form.Control
            id="users-table-pagination-go-to-page-input"
            type="number"
            size="sm"
            style={{ 'max-width': '50px' }}
            value={props.table.getState().pagination.pageIndex + 1}
            onChange={handleChangePageNumber}
          />
          <Form.Label
            id="users-table-pagination-size-label"
            htmlFor="users-table-pagination-size-select"
            class="d-flex justify-content-end align-items-center mb-0 px-1"
          >
            Page Size
          </Form.Label>
          <Form.Select
            id="users-table-pagination-size-select"
            size="sm"
            style={{ 'max-width': '100px' }}
            value={props.table.getState().pagination.pageSize}
            onChange={handleChangePageSize}
          >
            {displayPageSizeInterval
              .filter((v) => v <= pageInterval())
              .map((pageSize) => (
                <option value={pageSize}>Show {pageSize}</option>
              ))}
          </Form.Select>
        </Form.Group>
      </Stack>
    </Show>
  );
};
