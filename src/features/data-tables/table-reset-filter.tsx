import { Table } from '@tanstack/solid-table';
import { Button, Stack } from 'solid-bootstrap';
import { Accessor, Show } from 'solid-js';
import { useLayoutContext } from '~/providers/theme';

/**
 * @summary Filter component for table columns.
 */
export function TableResetFilter({
  table,
  isFiltering,
  resetFilter
}: {
  table: Table<any>;
  isFiltering: Accessor<boolean>;
  resetFilter: () => void;
}) {
  const layout = useLayoutContext();
  return (
    <Show when={isFiltering()}>
      <Stack
        direction="horizontal"
        class="d-flex justify-content-between align-items-center flex-nowrap my-2"
      >
        <Button
          class="d-block"
          size="sm"
          variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
          onClick={() => resetFilter()}
        >
          Reset Filters
        </Button>
      </Stack>
    </Show>
  );
}
