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
  WEBSITES_PAGE_SIZE,
  WEBSITES_PAGE_START,
  fetchWebsitesList
} from '~/entities/websites';
import {
  TableBody,
  TableColumnIsActive,
  TableFooter,
  TableHeader
} from '~/features/data-tables';
import { useThemeContext } from '~/features/theme';
import { Paginated_WebsiteRead_, WebsiteRead } from '~/shared/api';
import { WebsitesTableActions } from '~/widgets/data-table-actions';

type WebsiteDataTableProps = {
  initialData: Paginated_WebsiteRead_ | undefined;
  clientId?: string | null;
};

const WebsiteDataTable = (props: WebsiteDataTableProps) => {
  const theme = useThemeContext();
  const [fetchPage, setFetchPage] = createSignal(
    props.initialData?.page ?? WEBSITES_PAGE_START
  );
  const [fetchSize, setFetchSize] = createSignal(
    props.initialData?.size ?? WEBSITES_PAGE_SIZE
  );
  const [fetchClientId, setFetchClientId] = createSignal(props.clientId ?? null);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<WebsiteRead[]>(props.initialData?.results ?? []);
  const query = createQuery(() => ({
    queryKey: ['websites', fetchPage(), fetchSize(), fetchClientId()],
    queryFn: fetchWebsitesList,
    initialData: props.initialData
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r: WebsiteRead) => r));
    }
  });
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<WebsiteRead>();
  const columns: ColumnDef<WebsiteRead>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('domain', {
          header: () => 'Title',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('is_secure', {
          header: () => 'HTTPS',
          footer: (props) => props.column.id,
          cell: (info) => <TableColumnIsActive isActive={info.getValue()} />
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
          cell: (info) => <WebsitesTableActions website={info.row.original} />
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

export default WebsiteDataTable;