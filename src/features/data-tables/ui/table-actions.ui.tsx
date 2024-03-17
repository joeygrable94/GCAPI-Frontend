import { Button, Stack } from 'solid-bootstrap';
import { Component, Show } from 'solid-js';
import { ITableFooterActionsProps } from '~/features/data-tables';
import { useThemeContext } from '~/features/theme';

/**
 * @summary Filter component for table columns.
 */
export const TableFooterActions: Component<ITableFooterActionsProps> = (props) => {
  const layout = useThemeContext();
  return (
    <Stack
      direction="horizontal"
      class="d-flex flex-row justify-content-start align-items-center flex-nowrap my-2"
    >
      <Show when={props.isFiltering()}>
        <Button
          class="d-block"
          size="sm"
          variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
          onClick={() => props.resetFilter()}
        >
          Reset Filters
        </Button>
      </Show>
    </Stack>
  );
};
