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
  SITEMAP_PAGE_SIZE,
  SITEMAP_PAGE_START,
  fetchWebsiteSitemapsList
} from '~/entities/sitemaps';
import {
  TableBody,
  TableColumnIsActive,
  TableFooter,
  TableHeader
} from '~/features/data-tables';
import { useThemeContext } from '~/features/theme';
import { Paginated_WebsiteMapRead_, WebsiteMapRead, WebsiteRead } from '~/shared/api';
import { WebsiteSitemapsTableActions } from '~/widgets/data-table-actions';

type WebsiteSitemapsDataTableProps = {
  initialData: Paginated_WebsiteMapRead_ | undefined;
  website?: WebsiteRead;
};

const WebsiteSitemapsDataTable = (props: WebsiteSitemapsDataTableProps) => {
  const theme = useThemeContext();
  const [fetchPage, setFetchPage] = createSignal(
    props.initialData?.page ?? SITEMAP_PAGE_START
  );
  const [fetchSize, setFetchSize] = createSignal(
    props.initialData?.size ?? SITEMAP_PAGE_SIZE
  );
  const [fetchWebsiteId, setFetchWebsiteId] = createSignal(props.website?.id ?? null);
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<WebsiteMapRead[]>(
    props.initialData?.results ?? []
  );
  const query = createQuery(() => ({
    queryKey: ['sitemaps', fetchPage(), fetchSize(), fetchWebsiteId()],
    queryFn: fetchWebsiteSitemapsList,
    initialData: props.initialData
  }));
  createEffect(() => {
    if (query.data !== undefined && query.data !== null) {
      setFetchTodal(query.data.total);
      setData(query.data.results.map((r: WebsiteMapRead) => r));
    }
  });
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<WebsiteMapRead>();
  const columns: ColumnDef<WebsiteMapRead>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('url', {
          header: () => 'URL',
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
          cell: (info) => <WebsiteSitemapsTableActions sitemap={info.row.original} />
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

export default WebsiteSitemapsDataTable;
