/*
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
import { BANK_PAGE_SIZE, BANK_PAGE_START } from '~/entities/bank';
import { TableBody, TableFooter, TableHeader } from '~/entities/data-tables';
import { tableFilterTagsFx } from '~/entities/tag';
import { useFinancialState } from '~/providers/financials';
import { useThemeContext } from '~/providers/theme';
import { BankRead, Paginated_BankRead_ } from '~/shared/api';
import { BankTagBadgeList } from '~/widgets/badge-blocks';
import { BankTableActions } from '~/widgets/data-table-actions';

type BankDataTableProps = {
  initialData: Paginated_BankRead_ | undefined;
};

const BankDataTable = (props: BankDataTableProps) => {
  const theme = useThemeContext();
  const [fetchPage, setFetchPage] = createSignal(
    props.initialData?.page ?? BANK_PAGE_START
  );
  const [fetchSize, setFetchSize] = createSignal(
    props.initialData?.size ?? BANK_PAGE_SIZE
  );
  const [fetchTotal, setFetchTodal] = createSignal(props.initialData?.total ?? 0);
  const [data, setData] = createSignal<BankRead[]>(props.initialData?.results ?? []);
  const [finState, finActions] = useFinancialState();
  createEffect(() => setData(finState.banks.results));
  const [sorting, setSorting] = createSignal<SortingState>([]);
  const columnHelper = createColumnHelper<BankRead>();
  const columns: ColumnDef<BankRead>[] = [
    columnHelper.group({
      header: 'Info',
      columns: [
        columnHelper.accessor('name', {
          header: () => 'Name',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('description', {
          header: () => 'Description',
          footer: (props) => props.column.id,
          cell: (info) => info.getValue()
        }),
        columnHelper.accessor('tags', {
          header: () => 'Tags',
          footer: (props) => props.column.id,
          filterFn: tableFilterTagsFx,
          cell: (info) => (
            <BankTagBadgeList bank={info.row.original} tags={info.getValue()} />
          )
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
          cell: (info) => <BankTableActions bank={info.row.original} />
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

export default BankDataTable;
*/
