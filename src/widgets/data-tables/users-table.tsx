import {
  TableBody,
  TableColumnIsActive,
  TableContent,
  TableFooter,
  TableHeader,
} from '@getcommunity/gcui/table-data';
import { createQuery } from '@tanstack/solid-query';
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/solid-table';
import { createEffect, createSignal, lazy } from 'solid-js';
import {
  USERS_PAGE_SIZE,
  USERS_PAGE_START,
  UserProfilePicturePreview,
  fetchUsersList,
} from '~/entities/users';
import { useTheme } from '~/providers/theme';
import {
  Paginated_UserReadAsAdmin_,
  Paginated_UserReadAsManager_,
  UserReadAsAdmin,
  UserReadAsManager,
} from '~/shared/api';
import { formatDateString } from '~/shared/utils';

const UsersTableActions = lazy(
  () => import('~/widgets/data-table-actions/users-table-actions')
);

type UsersDataTableProps = {
  initialData: Paginated_UserReadAsAdmin_ | Paginated_UserReadAsManager_ | undefined;
};

const UsersDataTable = (props: UsersDataTableProps) => {
  const [theme] = useTheme();
  const [fetchPage] = createSignal(props.initialData?.page ?? USERS_PAGE_START);
  const [fetchSize] = createSignal(props.initialData?.size ?? USERS_PAGE_SIZE);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<UserReadAsAdmin[] | UserReadAsManager[]>(
    props.initialData?.results ?? []
  );
  const query = createQuery(() => ({
    queryKey: ['users', fetchPage(), fetchSize()],
    queryFn: fetchUsersList,
    initialData: props.initialData,
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r: UserReadAsAdmin | UserReadAsManager) => r));
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
          cell: (info) => <UserProfilePicturePreview src={info.getValue()} />,
        }),
        columnHelper.accessor('email', {
          header: () => 'Email',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('username', {
          header: () => 'Username',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('is_active', {
          header: () => 'Is Active',
          footer: (props) => props.column.id,
          cell: (info) => <TableColumnIsActive isActive={info.getValue()} />,
        }),
        columnHelper.accessor('is_verified', {
          header: () => 'Is Verified',
          footer: (props) => props.column.id,
          cell: (info) => <TableColumnIsActive isActive={info.getValue()} />,
        }),
        columnHelper.accessor('created', {
          header: () => 'Created',
          footer: (props) => props.column.id,
          cell: (info) =>
            info.getValue() ? formatDateString(new Date(info.getValue())) : 'N/A',
        }),
        columnHelper.accessor('updated', {
          header: () => 'Updated',
          footer: (props) => props.column.id,
          cell: (info) =>
            info.getValue() ? formatDateString(new Date(info.getValue())) : 'N/A',
        }),
      ],
    }),
    columnHelper.group({
      header: 'Actions',
      columns: [
        columnHelper.display({
          id: 'id',
          header: () => '',
          footer: (props) => props.column.id,
          cell: (info) => <UsersTableActions user={info.row.original} />,
        }),
      ],
    }),
  ];
  const table = createSolidTable({
    get data() {
      return data();
    },
    columns,
    state: {
      get sorting() {
        return sorting();
      },
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: import.meta.env.VITE_APP_ENV === 'development',
  });
  const [isFiltering, setIsFiltering] = createSignal(false);
  const resetFilter = () => {
    setIsFiltering(false);
    table.resetColumnFilters(true);
  };
  return (
    <>
      <TableContent>
        {/* @ts-expect-error table type unknown */}
        <TableHeader table={table} setIsFiltering={setIsFiltering} />
        {/* @ts-expect-error table type unknown */}
        <TableBody table={table} />
        <TableFooter
          // @ts-expect-error table type unknown
          table={table}
          maximum={fetchTotal}
          isFiltering={isFiltering}
          fetchTotal={fetchTotal}
          resetFilter={resetFilter}
        />
      </TableContent>
    </>
  );
};

export default UsersDataTable;
