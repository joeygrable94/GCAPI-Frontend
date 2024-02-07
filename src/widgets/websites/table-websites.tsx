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
import { fetchWebsitesList } from '~/entities/websites';
import {
  TableColumnFilter,
  TablePagination,
  TableResetFilter
} from '~/features/data-tables';
import { useLayoutContext } from '~/providers/theme';
import { Paginated_WebsiteRead_, WebsiteRead } from '~/shared/api';
import { formatDateString } from '~/shared/utils';
import { ModalEditWebsite } from '~/widgets/websites';

type WebsitesDataTableProps = {
  initialData: Paginated_WebsiteRead_ | undefined;
  clientId?: string | null;
};

const WebsitesDataTable = (props: WebsitesDataTableProps) => {
  const layout = useLayoutContext();
  const [fetchPage, setFetchPage] = createSignal(props.initialData?.page ?? 1);
  const [fetchSize, setFetchSize] = createSignal(props.initialData?.size ?? 10);
  const [fetchClientId, setFetchClientId] = createSignal(props.clientId ?? null);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<WebsiteRead[]>(props.initialData?.results ?? []);
  const query = createQuery(() => ({
    queryKey: ['websites', fetchPage(), fetchSize(), fetchClientId()],
    queryFn: fetchWebsitesList,
    initialData: props.initialData
  }));
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const [isFiltering, setIsFiltering] = createSignal<boolean>(false);
  const columnHelper = createColumnHelper<WebsiteRead>();
  const columns: ColumnDef<WebsiteRead>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('domain', {
          header: () => 'Domain Name',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('is_secure', {
          header: () => 'Secure (HTTPS)',
          footer: (props) => props.column.id,
          cell: (info) => {
            return info.getValue() ? (
              <Icon path={checkBadge} class="icon text-success" />
            ) : (
              <Icon path={xCircle} class="icon text-danger" />
            );
          }
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
                <a href={`/websites/${info.row.original.id}`}>
                  <Icon path={eye} class="icon" aria-label="View Website" />
                </a>
                <a
                  href={`#edit-website_${info.row.original.id}`}
                  onClick={() => setOpenEdit(true)}
                >
                  <Icon
                    path={pencilSquare}
                    class="icon"
                    aria-label={`Edit Website ${info.row.original.domain}`}
                  />
                </a>
                <ModalEditWebsite
                  website={info.row.original}
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
  const resetFilter = () => {
    setIsFiltering(false);
    table.resetColumnFilters(true);
  };
  createEffect(() => {
    if (query.data !== undefined) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r) => r));
    }
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

export default WebsitesDataTable;
