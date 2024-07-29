import { Button } from '@kobalte/core/button';
import { Component, Show } from 'solid-js';
import { useTheme } from '~/providers/theme';
import { ITableFooterActionsProps } from '~/shared/ui/table-data';

/**
 * @summary Filter component for table columns.
 */
export const TableFooterActions: Component<ITableFooterActionsProps> = (props) => {
  const [theme] = useTheme();
  return (
    <div class="d-flex justify-content-start align-items-center my-2 flex-row flex-nowrap">
      <Show when={props.isFiltering()}>
        <Button
          class={theme.darkMode ? 'outline-light' : 'outline-dark'}
          onClick={() => props.resetFilter()}
        >
          Reset Filters
        </Button>
      </Show>
    </div>
  );
};
