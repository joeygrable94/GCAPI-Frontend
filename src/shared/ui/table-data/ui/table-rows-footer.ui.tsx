import { Component } from 'solid-js';
import { useTheme } from '~/providers/theme';
import {
  ITableFooterProps,
  TableFooterActions,
  TablePagination
} from '~/shared/ui/table-data';

export const TableFooter: Component<ITableFooterProps> = (props) => {
  const [theme] = useTheme();
  return (
    <tfoot class="border-0 border-solid border-inherit">
      <tr class="border-0 border-solid border-inherit">
        <td
          colSpan={'100%'}
          class={`border-b-1 p-2 ${theme.darkMode ? 'bg-dark' : 'bg-white'}`}
        >
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
