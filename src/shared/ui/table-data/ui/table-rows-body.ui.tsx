import { flexRender } from '@tanstack/solid-table';
import { Component, For } from 'solid-js';
import { ITableBodyProps } from '~/shared/ui/table-data';

export const TableBody: Component<ITableBodyProps> = (props) => {
  return (
    <tbody class="border-0 border-solid border-inherit">
      <For each={props.table.getRowModel().rows}>
        {(row) => (
          <tr class="border-0 border-solid border-inherit hover:bg-gray-100 dark:hover:bg-gray-800">
            <For each={row.getVisibleCells()}>
              {(cell) => (
                <td class="border-b-1 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              )}
            </For>
          </tr>
        )}
      </For>
    </tbody>
  );
};
