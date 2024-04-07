import { Component } from 'solid-js';
import { useThemeContext } from '~/features/theme';
import {
  ITableFooterProps,
  TableFooterActions,
  TablePagination
} from '~/shared/data-tables';

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
