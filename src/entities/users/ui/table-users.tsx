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
import { Image, Stack, Table } from 'solid-bootstrap';
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
import { fetchUsersList } from '~/entities/users';
import {
  TableColumnFilter,
  TablePagination,
  TableResetFilter
} from '~/features/data-tables';
import { useThemeContext } from '~/providers/theme';
import {
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserReadAsAdmin,
  UserReadAsManager
} from '~/shared/api';
import { formatDateString } from '~/shared/utils';
import ModalEditUser from './modal-update';

type UsersDataTableProps = {
  initialData: Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_ | undefined;
};

const UsersDataTable = (props: UsersDataTableProps) => {
  const layout = useThemeContext();
  const [fetchPage, setFetchPage] = createSignal(props.initialData?.page ?? 1);
  const [fetchSize, setFetchSize] = createSignal(props.initialData?.size ?? 10);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const query = createQuery(() => ({
    queryKey: ['users', fetchPage(), fetchSize()],
    queryFn: fetchUsersList,
    initialData: props.initialData
  }));
  const [data, setData] = createSignal<UserReadAsAdmin[] | UserReadAsManager[]>(
    props.initialData?.results ?? []
  );
  createEffect(() => {
    if (query.data !== undefined) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r) => r));
    }
  });
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<UserReadAsAdmin | UserReadAsManager>();
  const columns: ColumnDef<UserReadAsAdmin | UserReadAsManager>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('picture', {
          header: () => 'Profile Picture',
          footer: (props) => props.column.id,
          cell: (info) => {
            return (
              <div
                class="image-container-square"
                style={{ width: '60px', 'padding-bottom': '60px', margin: 'auto' }}
              >
                <Image
                  class="image-square"
                  src={
                    info.getValue() ?? 'https://www.gravatar.com/avatar/?d=identicon'
                  }
                  roundedCircle
                />
              </div>
            );
          }
        }),
        columnHelper.accessor('email', {
          header: () => 'Email',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('username', {
          header: () => 'Username',
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
        columnHelper.accessor('is_verified', {
          header: () => 'Is Verified',
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
        }),
        columnHelper.accessor('updated_on', {
          header: () => 'Updated',
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
                <a href={`/users/${info.row.original.id}`}>
                  <Icon path={eye} class="icon" aria-label="View User" />
                </a>
                <a
                  href={`#edit-user_${info.row.original.id}`}
                  onClick={() => setOpenEdit(true)}
                >
                  <Icon
                    path={pencilSquare}
                    class="icon"
                    aria-label={`Edit User ${info.row.original.username}`}
                  />
                </a>
                <ModalEditUser
                  user={info.row.original}
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

export default UsersDataTable;
