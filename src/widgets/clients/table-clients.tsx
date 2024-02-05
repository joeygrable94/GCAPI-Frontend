import { createQuery } from '@tanstack/solid-query';
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
import { Stack, Table } from 'solid-bootstrap';
import { Icon } from 'solid-heroicons';
import {
  checkBadge,
  chevronDown,
  chevronUp,
  eye,
  pencilSquare,
  xCircle
} from 'solid-heroicons/outline';
import { For, createEffect, createSignal } from 'solid-js';
import { fetchClientsList } from '~/entities/clients';
import {
  TableColumnFilter,
  TablePagination,
  TableResetFilter
} from '~/features/data-tables';
import { useLayoutContext } from '~/providers/theme';
import { ClientRead, Paginated_ClientRead_ } from '~/shared/api';
import { formatDateString } from '~/shared/utils';
import { ModalEditClient } from '~/widgets/clients';

type ClientsDataTableProps = {
  initialData: Paginated_ClientRead_ | undefined;
};

const ClientsDataTable = (props: ClientsDataTableProps) => {
  const layout = useLayoutContext();
  const [fetchPage, setFetchPage] = createSignal(props.initialData?.page ?? 1);
  const [fetchSize, setFetchSize] = createSignal(props.initialData?.size ?? 10);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const query = createQuery(() => ({
    queryKey: ['clients', fetchPage(), fetchSize()],
    queryFn: fetchClientsList,
    initialData: props.initialData
  }));
  const [data, setData] = createSignal<ClientRead[]>(props.initialData?.results ?? []);
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r) => r));
    }
  });
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<ClientRead>();
  const columns: ColumnDef<ClientRead>[] = [
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
              <Icon path={checkBadge} class="icon text-success" />
            ) : (
              <Icon path={xCircle} class="icon text-danger" />
            );
          }
        }),
        columnHelper.accessor('created_on', {
          header: () => 'Created',
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
            const [openEdit, setOpenEdit] = createSignal(false);
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
                  onClick={() => setOpenEdit(true)}
                >
                  <Icon
                    path={pencilSquare}
                    class="icon"
                    aria-label={`Edit Client ${info.row.original.title}`}
                  />
                </a>
                <ModalEditClient
                  client={info.row.original}
                  open={openEdit}
                  setOpen={setOpenEdit}
                  refetch={query.refetch}
                />
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
  const [isFiltering, setIsFiltering] = createSignal(false);
  const resetFilter = () => {
    setIsFiltering(false);
    table.resetColumnFilters(true);
  };
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
                            <TableColumnFilter
                              column={header.column}
                              table={table}
                              setIsFiltering={setIsFiltering}
                            />
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
      <TablePagination table={table} maximum={fetchTotal} />
      <TableResetFilter
        table={table}
        isFiltering={isFiltering}
        resetFilter={resetFilter}
      />
    </>
  );
};

export default ClientsDataTable;
