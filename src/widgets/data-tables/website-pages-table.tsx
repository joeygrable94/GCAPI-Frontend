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
import { createEffect, createSignal, lazy } from 'solid-js';
import {
  WEBSITEPAGE_PAGE_SIZE,
  WEBSITEPAGE_PAGE_START,
  fetchWebsitePagesList
} from '~/entities/website-pages';
import { useTheme } from '~/providers/theme';
import { Paginated_WebsitePageRead_, WebsitePageRead } from '~/shared/api';
import {
  TableBody,
  TableColumnIsActive,
  TableContent,
  TableFooter,
  TableHeader,
  columnSortByUrl
} from '~/shared/ui/table-data';
import { formatDateString } from '~/shared/utils';

const WebsitePagesTableActions = lazy(
  () => import('~/widgets/data-table-actions/website-pages-table-actions')
);

type WebsitePagesDataTableProps = {
  initialData: Paginated_WebsitePageRead_ | undefined;
  websiteId?: string | null;
  sitemapId?: string | null;
};

const WebsitePagesDataTable = (props: WebsitePagesDataTableProps) => {
  const [theme] = useTheme();
  const [fetchPage] = createSignal(props.initialData?.page ?? WEBSITEPAGE_PAGE_START);
  const [fetchSize] = createSignal(props.initialData?.size ?? WEBSITEPAGE_PAGE_SIZE);
  const [fetchWebsiteId] = createSignal(props.websiteId ?? null);
  const [fetchSitemapId] = createSignal(props.sitemapId ?? null);
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
  const [sorting, setSorting] = createSignal<SortingState>([
    { id: 'url', desc: false }
  ]);
  const columnHelper = createColumnHelper<WebsitePageRead>();
  const columns: ColumnDef<WebsitePageRead>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('url', {
          header: () => 'URL',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue(),
          sortingFn: columnSortByUrl
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

export default WebsitePagesDataTable;
