import { flexRender } from '@tanstack/solid-table';
import { Component, For } from 'solid-js';
import { ITableBodyProps } from '~/entities/data-tables';

export const TableBody: Component<ITableBodyProps> = (props) => {
  return (
    <tbody>
      <For each={props.table.getRowModel().rows}>
        {(row) => (
          <tr>
            <For each={row.getVisibleCells()}>
              {(cell) => (
                <td>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              )}
            </For>
          </tr>
        )}
      </For>
    </tbody>
  );
};
