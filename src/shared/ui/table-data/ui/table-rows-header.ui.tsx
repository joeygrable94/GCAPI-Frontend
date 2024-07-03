import { flexRender } from '@tanstack/solid-table';
import { Component, For } from 'solid-js';
import { KeyboardArrowDownIcon, KeyboardArrowUpIcon } from '~/shared/ui/icon';
import { ITableHeaderProps } from '~/shared/ui/table-data';
// import { TableColumnFilter } from './table-filter-column.ui';

export const TableHeader: Component<ITableHeaderProps> = (props) => {
  return (
    <thead class="border-0 border-solid border-inherit align-bottom">
      <For each={props.table.getHeaderGroups()}>
        {(headerGroup) => (
          <tr class="border-0 border-solid border-inherit">
            <For each={headerGroup.headers}>
              {(header) => (
                <th
                  id={header.id}
                  colSpan={header.colSpan}
                  class="border-b-1 p-2"
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
                    <div class="d-flex flex-row flex-nowrap">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: () => <KeyboardArrowDownIcon />,
                        desc: () => <KeyboardArrowUpIcon />
                      }[header.column.getIsSorted() as keyof object] ?? null}
                    </div>
                  </div>
                  {/* <div>
                    {header.column.getCanFilter() ? (
                      <div class="mt-1">
                        <TableColumnFilter
                          table={props.table}
                          column={header.column}
                          setIsFiltering={props.setIsFiltering}
                        />
                      </div>
                    ) : null}
                  </div> */}
                </th>
              )}
            </For>
          </tr>
        )}
      </For>
    </thead>
  );
};
