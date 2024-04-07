import { createQuery } from '@tanstack/solid-query';
import {
  ColumnDef,
  SortingState,
  createColumnHelper,
  createSolidTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/solid-table';
import { Table } from 'solid-bootstrap';
import { createEffect, createSignal } from 'solid-js';
import {
  CLIENTS_PAGE_SIZE,
  CLIENTS_PAGE_START,
  fetchClientsList
} from '~/entities/clients';
import { useThemeContext } from '~/features/theme';
import { ClientRead, Paginated_ClientRead_ } from '~/shared/api';
import {
  TableBody,
  TableColumnIsActive,
  TableFooter,
  TableHeader
} from '~/shared/data-tables';
import { ClientsTableActions } from '~/widgets/data-table-actions';

type ClientDataTableProps = {
  initialData: Paginated_ClientRead_ | undefined;
};

const ClientDataTable = (props: ClientDataTableProps) => {
  const theme = useThemeContext();
  const [fetchPage, setFetchPage] = createSignal(
    props.initialData?.page ?? CLIENTS_PAGE_START
  );
  const [fetchSize, setFetchSize] = createSignal(
    props.initialData?.size ?? CLIENTS_PAGE_SIZE
  );
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<ClientRead[]>(props.initialData?.results ?? []);
  const query = createQuery(() => ({
    queryKey: ['clients', fetchPage(), fetchSize()],
    queryFn: fetchClientsList,
    initialData: props.initialData
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
          cell: (info) => <TableColumnIsActive isActive={info.getValue()} />
        })
      ]
    }),
    columnHelper.group({
      header: 'Actions',
      columns: [
        columnHelper.display({
          id: 'id',
          header: () => '',
          footer: (props) => props.column.id,
          cell: (info) => <ClientsTableActions client={info.row.original} />
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
    debugTable: import.meta.env.VITE_APP_ENV === 'development'
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
        variant={theme.darkMode ? 'dark' : 'light'}
        responsive
        striped
        bordered
        hover
      >
        <TableHeader table={table} setIsFiltering={setIsFiltering} />
        <TableBody table={table} />
        <TableFooter
          table={table}
          maximum={fetchTotal}
          isFiltering={isFiltering}
          fetchTotal={fetchTotal}
          resetFilter={resetFilter}
        />
      </Table>
    </>
  );
};

export default ClientDataTable;
