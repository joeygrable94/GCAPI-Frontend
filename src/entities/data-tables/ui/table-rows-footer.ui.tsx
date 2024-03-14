import { Component } from 'solid-js';
import {
  ITableFooterProps,
  TableFooterActions,
  TablePagination
} from '~/entities/data-tables';
import { useThemeContext } from '~/providers/theme';

export const TableFooter: Component<ITableFooterProps> = (props) => {
  const theme = useThemeContext();
  return (
    <tfoot>
      <tr>
        <td colSpan={'100%'} class={theme.darkMode ? 'bg-dark' : 'bg-white'}>
          <TablePagination table={props.table} maximum={props.fetchTotal} />
          <TableFooterActions
            table={props.table}
            isFiltering={props.isFiltering}
            resetFilter={props.resetFilter}
          />
        </td>
      </tr>
    </tfoot>
  );
};
