import { Table } from '@tanstack/solid-table';
import { Button, ButtonGroup, ButtonToolbar, Form, Stack } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import {
  chevronDoubleLeft,
  chevronDoubleRight,
  chevronLeft,
  chevronRight
} from 'solid-heroicons/outline';
import { Accessor, Show } from 'solid-js';
import { useLayoutContext } from '~/providers/theme';

/**
 * @summary Filter component for table columns.
 */
export function TablePagination({
  table,
  maximum
}: {
  table: Table<any>;
  maximum: Accessor<number>;
}) {
  const layout = useLayoutContext();
  const displayPageSizeInterval = [10, 20, 30, 40, 50, 100, 1000];
  const handleChangePageSize = (e: any) => {
    table.setPageSize(Number(e.target.value));
  };
  const handleChangePageNumber = (e: any) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    table.setPageIndex(page);
  };
  return (
    <Show when={maximum() > displayPageSizeInterval[0]}>
      <Stack
        direction="horizontal"
        class="d-flex justify-content-between align-items-center flex-nowrap mb-2"
      >
        <ButtonToolbar class="w-20 inline-block">
          <ButtonGroup size="sm">
            <Button
              variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon path={chevronDoubleLeft} class="icon" />
            </Button>
            <Button
              variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon path={chevronLeft} class="icon" />
            </Button>
            <Button
              variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon path={chevronRight} class="icon" />
            </Button>
            <Button
              variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <Icon path={chevronDoubleRight} class="icon" />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Form.Group class="w-30 inline-block text-center">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}{' '}
          &mdash; {table.getRowModel().rows.length} Rows
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
            value={table.getState().pagination.pageIndex + 1}
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
            value={table.getState().pagination.pageSize}
            onChange={handleChangePageSize}
          >
            {displayPageSizeInterval
              .filter((v) => v <= maximum())
              .map((pageSize) => (
                <option value={pageSize}>Show {pageSize}</option>
              ))}
          </Form.Select>
        </Form.Group>
      </Stack>
    </Show>
  );
}
