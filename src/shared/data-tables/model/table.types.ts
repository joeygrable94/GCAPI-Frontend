import { Column, Table } from '@tanstack/solid-table';
import { Accessor, Setter } from 'solid-js';

export interface ITableProps {
  table: Table<unknown>;
}

export interface ITableHeaderProps extends ITableProps {
  setIsFiltering: Setter<boolean>;
}

export interface ITableColumnFilterProps extends ITableProps {
  column: Column<unknown, unknown>;
  setIsFiltering: Setter<boolean>;
}

export interface ITableFooterProps extends ITableProps {
  maximum: Accessor<number>;
  isFiltering: Accessor<boolean>;
  fetchTotal: Accessor<number>;
  resetFilter: () => void;
}

export interface ITableBodyProps extends ITableProps {}

export interface ITablePaginationProps extends ITableProps {
  maximum: Accessor<number>;
}

export interface ITableFooterActionsProps extends ITableProps {
  isFiltering: Accessor<boolean>;
  resetFilter: () => void;
}
