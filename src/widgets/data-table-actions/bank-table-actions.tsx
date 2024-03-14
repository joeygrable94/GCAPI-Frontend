/*
import { useNavigate } from '@solidjs/router';
import { Button, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import { useThemeContext } from '~/providers/theme';
import { BankRead } from '~/shared/api';
import { ViewIcon } from '~/shared/icons';
import { BankEditFormDialog } from '~/widgets/form-dialogs';

interface IBankTableActionsProps {
  bank: BankRead;
}

const BankTableActions: Component<IBankTableActionsProps> = (props) => {
  const theme = useThemeContext();
  const navigate = useNavigate();
  return (
    <Stack direction="horizontal" gap={2} class="d-flex flex-row flex-nowrap">
      <Button
        size="sm"
        variant={theme.darkMode ? 'outline-light' : 'outline-dark'}
        onClick={() => navigate(`/bank/${props.bank.id}`)}
      >
        <ViewIcon />
      </Button>
      <BankEditFormDialog
        bank={props.bank}
        title={`Edit Bank: ${props.bank.data_key}`}
        description={'Fill out the form below to and click save to edit this bank.'}
      />
    </Stack>
  );
};

export default BankTableActions;
*/
