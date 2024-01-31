import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/solid-table';
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  Stack,
  Table
} from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import {
  checkBadge,
  chevronDoubleLeft,
  chevronDoubleRight,
  chevronDown,
  chevronLeft,
  chevronRight,
  chevronUp,
  eye,
  pencilSquare,
  xCircle
} from 'solid-heroicons/outline';
import { For, createEffect, createSignal } from 'solid-js';
import { useLayoutContext } from '~/components';
import { formatDateString, log } from '~/utils';
import { Filter } from './column-filter';

type DataTableProps = {
  data: any[] | undefined;
};

const DataTable = (props: DataTableProps) => {
  const layout = useLayoutContext();
  const [data, setData] = createSignal<any[]>(props.data ?? []);
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<any>();
  const columns: ColumnDef<any>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('title', {
          header: () => 'Title',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('description', {
          header: () => 'Description',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('is_active', {
          header: () => 'Is Active',
          footer: (props) => props.column.id,
          cell: (info) => {
            return info.getValue() ? (
              <Icon path={checkBadge} class="icon" />
            ) : (
              <Icon path={xCircle} class="icon" />
            );
          }
        }),
        columnHelper.accessor('created_on', {
          header: () => 'Created On',
          footer: (props) => props.column.id,
          cell: (info) =>
            info.getValue() ? formatDateString(new Date(info.getValue())) : 'N/A'
        })
      ]
    }),
    columnHelper.group({
      header: 'Actions',
      columns: [
        columnHelper.display({
          id: 'id',
          header: () => <span>View&nbsp;|&nbsp;Edit</span>,
          footer: (props) => props.column.id,
          cell: (info) => {
            const handleEdit = () => {
              log('Edit', info.row.original.id);
            };
            return (
              <Stack
                direction="horizontal"
                gap={1}
                class="d-flex flex-row justify-content-around"
              >
                <a href={`/clients/${info.row.original.id}`}>
                  <Icon path={eye} class="icon" aria-label="View Client" />
                </a>
                <a
                  href={`#edit-client_${info.row.original.id}`}
                  onClick={() => handleEdit()}
                >
                  <Icon path={pencilSquare} class="icon" aria-label="Edit Client" />
                </a>
              </Stack>
            );
          }
        })
      ]
    })
  ];
  const table = createSolidTable({
    get data() {
      return data();
    },
    columns,
    state: {
      get sorting() {
        return sorting();
      }
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true
  });
  const goToPageNumber = (e: any) => {
    const page = e.target.value ? Number(e.target.value) - 1 : 0;
    table.setPageIndex(page);
  };
  const handleChangePageSize = (e: any) => {
    table.setPageSize(Number(e.target.value));
  };
  createEffect(() => {
    if (props.data === undefined) return;
    setData(props.data);
  });
  return (
    <>
      <Table
        size="sm"
        variant={layout.darkMode ? 'dark' : 'light'}
        responsive
        striped
        bordered
        hover
      >
        <thead>
          <For each={table.getHeaderGroups()}>
            {(headerGroup) => (
              <tr>
                <For each={headerGroup.headers}>
                  {(header) => (
                    <th id={header.id} colSpan={header.colSpan}>
                      <div
                        class={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none cursor-pointer-hover'
                            : undefined
                        }
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Stack direction="horizontal" gap={1}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: () => <Icon path={chevronUp} class="icon" />,
                            desc: () => <Icon path={chevronDown} class="icon" />
                          }[header.column.getIsSorted() as string] ?? null}
                        </Stack>
                      </div>
                      <div>
                        {header.column.getCanFilter() ? (
                          <div style="mt-1">
                            <Filter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    </th>
                  )}
                </For>
              </tr>
            )}
          </For>
        </thead>
        <tbody>
          <For each={table.getRowModel().rows}>
            {(row) => (
              <tr>
                <For each={row.getVisibleCells()}>
                  {(cell) => (
                    <>
                      <td>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    </>
                  )}
                </For>
              </tr>
            )}
          </For>
        </tbody>
      </Table>
      <Stack
        direction="horizontal"
        class="d-flex justify-content-between align-items-center flex-nowrap"
      >
        <ButtonToolbar class="w-20 inline-block">
          <ButtonGroup>
            <Button
              variant="outline-dark"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon path={chevronDoubleLeft} class="icon" />
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon path={chevronLeft} class="icon" />
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon path={chevronRight} class="icon" />
            </Button>
            <Button
              variant="outline-dark"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <Icon path={chevronDoubleRight} class="icon" />
            </Button>
          </ButtonGroup>
        </ButtonToolbar>
        <Form.Group class="w-50 inline-block text-center">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}{' '}
          &mdash; {table.getRowModel().rows.length} Rows
        </Form.Group>
        <Form.Group class="w-30 inline-block d-flex justify-content-end align-items-center">
          <Form.Label
            id="clients-table-pagination-go-to-page-label"
            htmlFor="clients-table-pagination-go-to-page-input"
            class="d-flex justify-content-end align-items-center w-100 mb-0 px-1"
          >
            Go To
          </Form.Label>
          <Form.Control
            id="clients-table-pagination-go-to-page-input"
            class="w-10"
            type="number"
            size="sm"
            value={table.getState().pagination.pageIndex + 1}
            onChange={goToPageNumber}
          />
          <Form.Label
            id="clients-table-pagination-size-label"
            htmlFor="clients-table-pagination-size-select"
            class="d-flex justify-content-end align-items-center w-100 mb-0 px-1"
          >
            Page Size
          </Form.Label>
          <Form.Select
            id="clients-table-pagination-size-select"
            class="w-10"
            size="sm"
            value={table.getState().pagination.pageSize}
            onChange={handleChangePageSize}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option value={pageSize}>Show {pageSize}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Stack>
    </>
  );
};

export default DataTable;
