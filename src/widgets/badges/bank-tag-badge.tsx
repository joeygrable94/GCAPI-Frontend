/*
import { Badge, CloseButton, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { BankRead, TagRead } from '~/shared/api';

interface IBankTagBadgeProps {
  bank: BankRead;
  tag: TagRead;
  bg?: string;
}

const BankTagBadge: Component<IBankTagBadgeProps> = (props) => {
  const [finState, finActions] = useFinancialState();
  return (
    <Badge
      pill
      bg={props.bg ?? 'primary'}
      as={Stack}
      direction="horizontal"
      class="d-flex flex-row flex-nowrap align-items-center"
    >
      <span class="px-1">{props.tag.name}</span>
      <CloseButton
        variant="white"
        onClick={() => finActions.banks.removeTag(props.bank.id, props.tag.id)}
      />
    </Badge>
  );
};

export default BankTagBadge;
*/
