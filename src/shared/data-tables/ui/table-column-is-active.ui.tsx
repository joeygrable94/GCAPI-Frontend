import { Stack } from 'solid-bootstrap';
import { Component, Match, Switch } from 'solid-js';
import { IsActiveIcon, IsNotActiveIcon } from '~/shared/icons';

interface ITableColumnIsActiveProps {
  isActive: boolean;
}

export const TableColumnIsActive: Component<ITableColumnIsActiveProps> = (props) => {
  return (
    <Stack
      direction="horizontal"
      gap={2}
      class="d-flex flex-row flex-nowrap justify-content-center align-items-center"
    >
      <Switch>
        <Match when={props.isActive === true}>
          <IsActiveIcon />
        </Match>
        <Match when={props.isActive === false}>
          <IsNotActiveIcon />
        </Match>
      </Switch>
    </Stack>
  );
};
