/*
import { Badge, CloseButton, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useFinancialState } from '~/providers/financials';
import { CategoryRead, TransactionRead } from '~/shared/api';

interface ITransactionCategoryBadgeProps {
  transaction: TransactionRead;
  category: CategoryRead;
  bg?: string;
}

const TransactionCategoryBadge: Component<ITransactionCategoryBadgeProps> = (props) => {
  const [finState, finActions] = useFinancialState();
  return (
    <Badge
      pill
      bg={props.bg ?? 'primary'}
      as={Stack}
      direction="horizontal"
      class="d-flex flex-row flex-nowrap align-items-center"
    >
      <span class="px-1">{props.category.name}</span>
      <CloseButton
        variant="white"
        onClick={() => finActions.transactions.removeCategory(props.transaction.id)}
      />
    </Badge>
  );
};

export default TransactionCategoryBadge;
*/
