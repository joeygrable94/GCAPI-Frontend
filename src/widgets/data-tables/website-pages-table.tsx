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
  WEBSITEPAGE_PAGE_SIZE,
  WEBSITEPAGE_PAGE_START,
  fetchWebsitePagesList
} from '~/entities/website-pages';
import { useThemeContext } from '~/features/theme';
import { Paginated_WebsitePageRead_, WebsitePageRead } from '~/shared/api';
import {
  TableBody,
  TableColumnIsActive,
  TableFooter,
  TableHeader
} from '~/shared/data-tables';
import { formatDateString } from '~/shared/utils';
import { WebsitePagesTableActions } from '../data-table-actions';

type WebsitePagesDataTableProps = {
  initialData: Paginated_WebsitePageRead_ | undefined;
  websiteId?: string | null;
  sitemapId?: string | null;
};

const WebsitePagesDataTable = (props: WebsitePagesDataTableProps) => {
  const theme = useThemeContext();
  const [fetchPage, setFetchPage] = createSignal(
    props.initialData?.page ?? WEBSITEPAGE_PAGE_START
  );
  const [fetchSize, setFetchSize] = createSignal(
    props.initialData?.size ?? WEBSITEPAGE_PAGE_SIZE
  );
  const [fetchWebsiteId, setFetchWebsiteId] = createSignal(props.websiteId ?? null);
  const [fetchSitemapId, setFetchSitemapId] = createSignal(props.sitemapId ?? null);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<WebsitePageRead[]>(
    props.initialData?.results ?? []
  );
  const query = createQuery(() => ({
    queryKey: [
      'websitePages',
      fetchPage(),
      fetchSize(),
      fetchWebsiteId(),
      fetchSitemapId()
    ],
    queryFn: fetchWebsitePagesList,
    initialData: props.initialData
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r: WebsitePageRead) => r));
    }
  });
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<WebsitePageRead>();
  const columns: ColumnDef<WebsitePageRead>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('url', {
          header: () => 'URL',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('status', {
          header: () => 'Status',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('priority', {
          header: () => 'Priority',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('last_modified', {
          header: () => 'Last Modified',
          footer: (props) => props.column.id,
          cell: (info) => formatDateString(new Date(info.getValue()))
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
          cell: (info) => <WebsitePagesTableActions websitePage={info.row.original} />
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

export default WebsitePagesDataTable;
