import { Box } from '@hope-ui/core';
import {
  ColumnDef,
  createSolidTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState
} from '@tanstack/solid-table';
import { createSignal, For, Resource, Show } from 'solid-js';
import { RouteDataArgs, Title, useParams, useRouteData } from 'solid-start';
import { createServerData$ } from 'solid-start/server';
import { UserAdmin, UserRead } from '~/api';
import { CheckAuthorized } from '~/lib/auth/types';
import {
  initialRouteAuthState,
  returnAuthorizedSuperUserOrRedirect,
  returnFetchUsersListByKey
} from '~/lib/auth/useAuth';
import { useAppStore } from '~/lib/core';
import { AppStoreContextValue } from '~/lib/core/types';
import { log } from '~/lib/core/utils';

export function routeData({ params }: RouteDataArgs) {
  const authorized: Resource<CheckAuthorized> = createServerData$(
    returnAuthorizedSuperUserOrRedirect,
    { initialValue: initialRouteAuthState }
  );
  const page: number = parseInt(params.page) > 0 ? parseInt(params.page) : 1;
  const users: Resource<UserRead[] | null[]> = createServerData$(
    returnFetchUsersListByKey,
    {
      key: () => [page],
      initialValue: []
    }
  );
  return { authorized, users };
}

export default function UsersIndex() {
  const { authorized, users }: any = useRouteData<typeof routeData>();
  const [state, actions]: AppStoreContextValue = useAppStore();
  const params: any = useParams();
  const [data, setData] = createSignal<UserAdmin[] | UserRead[] | null[]>(users());
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const refreshData = () => setData(state.users);

  const columns: ColumnDef<UserRead | UserAdmin>[] = [
    {
      header: 'Info',
      footer: (props: any) => props.column.id,
      columns: [
        {
          accessorFn: (row: any) => row.email,
          id: 'email',
          cell: (info: any) => info.getValue(),
          header: () => <span>Email</span>,
          footer: (props: any) => props.column.id
        },
        {
          accessorKey: 'is_verified',
          header: () => <span>Verified</span>,
          footer: (props: any) => props.column.id
        },
        {
          accessorKey: 'is_active',
          header: () => <span>Active</span>,
          footer: (props: any) => props.column.id
        },
        {
          accessorKey: 'is_superuser',
          header: () => <span>Admin</span>,
          footer: (props: any) => props.column.id
        },
        {
          accessorFn: (row: any) => new Date(row.created_on).toDateString(),
          id: 'created_on',
          header: () => <span>Created</span>,
          footer: (props: any) => props.column.id
        },
        {
          accessorFn: (row: any) => new Date(row.updated_on).toDateString(),
          id: 'updated_on',
          header: () => <span>Updated</span>,
          footer: (props: any) => props.column.id
        },
        {
          accessorFn: (row: any) => {
            let output = '';
            let pcount = row.principals.length;
            for (let i = 0; i < pcount; i++) {
              const perm = row.principals[i];
              if (i < pcount - 1) output += perm + ',\n';
              else output += perm;
            }
            return output;
          },
          id: 'principals',
          header: () => <span>Permissions</span>,
          footer: (props: any) => props.column.id
        }
      ]
    }
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
    debugTable: true
  });

  if (import.meta.env.DEV && !import.meta.env.SSR) log('<UsersIndex>');
  return (
    <>
      <Title>Users</Title>
      <main>
        <h1>All Users</h1>
        <p>Index: list all users</p>
        <Box as="table">
          <Box as="thead">
            <For each={table.getHeaderGroups()}>
              {(headerGroup) => (
                <Box as="tr">
                  <For each={headerGroup.headers}>
                    {(header) => (
                      <Box as="th" colSpan={header.colSpan}>
                        <Show when={!header.isPlaceholder}>
                          <Box
                            as="div"
                            class={
                              header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : undefined
                            }
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽'
                            }[header.column.getIsSorted() as string] ?? null}
                          </Box>
                        </Show>
                      </Box>
                    )}
                  </For>
                </Box>
              )}
            </For>
          </Box>
          <Box as="tbody">
            <For each={table.getRowModel().rows.slice(0, 10)}>
              {(row) => (
                <Box as="tr">
                  <For each={row.getVisibleCells()}>
                    {(cell) => (
                      <Box as="td">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </Box>
                    )}
                  </For>
                </Box>
              )}
            </For>
          </Box>
        </Box>
        <div>{table.getRowModel().rows.length} Rows</div>
        <div>
          <button onClick={() => refreshData()}>Refresh Data</button>
        </div>
        <pre>{JSON.stringify(sorting(), null, 2)}</pre>
      </main>
    </>
  );
}
