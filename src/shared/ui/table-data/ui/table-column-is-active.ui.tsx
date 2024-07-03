import { Component, Match, Switch } from 'solid-js';
import { IsActiveIcon, IsNotActiveIcon } from '~/shared/ui/icon';

interface ITableColumnIsActiveProps {
  isActive: boolean;
}

export const TableColumnIsActive: Component<ITableColumnIsActiveProps> = (props) => {
  return (
    <div class="d-flex justify-content-center align-items-center flex-row flex-nowrap">
      <Switch>
        <Match when={props.isActive === true}>
          <IsActiveIcon />
        </Match>
        <Match when={props.isActive === false}>
          <IsNotActiveIcon />
        </Match>
      </Switch>
    </div>
  );
};
