import { Button, Stack } from 'solid-bootstrap';
import { Component, Show } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { ITableFooterActionsProps } from '~/shared/data-tables';

/**
 * @summary Filter component for table columns.
 */
export const TableFooterActions: Component<ITableFooterActionsProps> = (props) => {
  const [theme] = useTheme();
  return (
    <Stack
      direction="horizontal"
      class="d-flex flex-row justify-content-start align-items-center flex-nowrap my-2"
    >
      <Show when={props.isFiltering()}>
        <Button
          class="d-block"
          size="sm"
          variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
          onClick={() => props.resetFilter()}
        >
          Reset Filters
        </Button>
      </Show>
    </Stack>
  );
};
