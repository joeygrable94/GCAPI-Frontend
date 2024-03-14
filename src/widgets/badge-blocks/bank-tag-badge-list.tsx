/*
import { Badge, Stack } from 'solid-bootstrap';
import { Component, For, Match, Switch } from 'solid-js';
import { BankRead, TagRead } from '~/shared/api';
import { BankTagBadge } from '~/widgets/badges';

interface IBankTagBadgeListProps {
  bank: BankRead;
  tags: TagRead[] | null | undefined;
  bg?: string;
}

const BankTagBadgeList: Component<IBankTagBadgeListProps> = (props) => {
  return (
    <Stack direction="horizontal" gap={1} class="d-flex flex-row flex-nowrap">
      <Switch>
        <Match when={!props.tags || (props.tags && props.tags.length === 0)}>
          <Badge pill bg={props.bg ?? 'primary'}>
            N/A
          </Badge>
        </Match>
        <Match when={props.tags && props.tags.length > 0}>
          <For each={props.tags}>
            {(tag: TagRead) => (
              <BankTagBadge bank={props.bank} tag={tag} bg={props.bg ?? 'primary'} />
            )}
          </For>
        </Match>
      </Switch>
    </Stack>
  );
};

export default BankTagBadgeList;
*/
