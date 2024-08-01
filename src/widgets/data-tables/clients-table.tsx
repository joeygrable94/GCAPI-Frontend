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
  CLIENTS_PAGE_SIZE,
  CLIENTS_PAGE_START,
  fetchClientsList,
} from '~/entities/clients';
import { useTheme } from '~/providers/theme';
import { ClientRead, Paginated_ClientRead_ } from '~/shared/api';

const ClientsTableActions = lazy(
  () => import('~/widgets/data-table-actions/clients-table-actions')
);

type ClientDataTableProps = {
  initialData: Paginated_ClientRead_ | undefined;
};

const ClientDataTable = (props: ClientDataTableProps) => {
  const [theme] = useTheme();
  const [fetchPage] = createSignal(props.initialData?.page ?? CLIENTS_PAGE_START);
  const [fetchSize] = createSignal(props.initialData?.size ?? CLIENTS_PAGE_SIZE);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<ClientRead[]>(props.initialData?.results ?? []);
  const query = createQuery(() => ({
    queryKey: ['clients', fetchPage(), fetchSize()],
    queryFn: fetchClientsList,
    initialData: props.initialData,
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r: ClientRead) => r));
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
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('description', {
          header: () => 'Description',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('is_active', {
          header: () => 'Is Active',
          footer: (props) => props.column.id,
          cell: (info) => <TableColumnIsActive isActive={info.getValue()} />,
        }),
      ],
    }),
    // columnHelper.group({
    //   header: 'Relationships',
    //   columns: [
    //     columnHelper.accessor('users', {
    //       header: () => 'Users',
    //       footer: (props) => props.column.id,
    //       cell: (info) => info.getValue()?.length ?? 0
    //     }),
    //     columnHelper.accessor('websites', {
    //       header: () => 'Websites',
    //       footer: (props) => props.column.id,
    //       cell: (info) => info.getValue()?.length ?? 0
    //     })
    //   ]
    // }),
    columnHelper.group({
      header: 'Actions',
      columns: [
        columnHelper.display({
          id: 'id',
          header: () => '',
          footer: (props) => props.column.id,
          cell: (info) => <ClientsTableActions client={info.row.original} />,
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

export default ClientDataTable;
