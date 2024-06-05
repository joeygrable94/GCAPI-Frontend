import { flexRender } from '@tanstack/solid-table';
import { Stack } from 'solid-bootstrap';
import { Component, For } from 'solid-js';
import { ITableHeaderProps } from '~/shared/data-tables';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '~/shared/icons';
import { TableColumnFilter } from './table-filter-column.ui';

export const TableHeader: Component<ITableHeaderProps> = (props) => {
  return (
    <thead>
      <For each={props.table.getHeaderGroups()}>
        {(headerGroup) => (
          <tr>
            <For each={headerGroup.headers}>
              {(header) => (
                <th
                  id={header.id}
                  colSpan={header.colSpan}
                  style={{ 'vertical-align': 'top' }}
                >
                  <div
                    class={
                      header.column.getCanSort()
                        ? 'cursor-pointer select-none'
                        : undefined
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <Stack direction="horizontal" gap={1}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: () => <KeyboardArrowDownIcon />,
                        desc: () => <KeyboardArrowUpIcon />
                      }[header.column.getIsSorted() as string] ?? null}
                    </Stack>
                  </div>
                  <div>
                    {header.column.getCanFilter() ? (
                      <div class="mt-1">
                        <TableColumnFilter
                          table={props.table}
                          column={header.column}
                          setIsFiltering={props.setIsFiltering}
                        />
                      </div>
                    ) : null}
                  </div>
                </th>
              )}
            </For>
          </tr>
        )}
      </For>
    </thead>
  );
};
