/*
import { Button, Spinner, Stack } from 'solid-bootstrap';
import { Component, JSX, Match, Switch, createSignal } from 'solid-js';
import { Dialog } from '~/features/dialogs';
import { useFinancialState } from '~/providers/financials';
import { StatementRead } from '~/shared/api';
import { DeleteIcon } from '~/shared/icons';

type StatementDeleteFormDialogProps = {
  statement: StatementRead;
  title: JSX.Element | string;
  description?: JSX.Element | string;
};

const StatementDeleteFormDialog: Component<StatementDeleteFormDialogProps> = (
  props
) => {
  const [finState, finActions] = useFinancialState();
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const handleSubmit = () => {
    setPending(true);
    finActions.statements.delete(props.statement.id);
    setTimeout(() => {
      setPending(false);
      setIsSubmitted(true);
    }, 1000);
    setTimeout(() => handleClose(), 2000);
  };

  return (
    <Dialog
      size="sm"
      triggerType="button"
      triggerElm={<DeleteIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={props.title}
      description={props.description}
      footerActions={
        <Stack class="w-100 mb-2 d-flex flex-row flex-nowrap justify-content-between">
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            type="submit"
            variant="danger"
            disabled={pending() || isSubmitted()}
            onClick={() => handleSubmit()}
          >
            <Switch>
              <Match when={pending()}>
                <Spinner size="sm" animation="border" />
              </Match>
              <Match when={!pending()}>Delete Statement</Match>
            </Switch>
          </Button>
        </Stack>
      }
    />
  );
};

export default StatementDeleteFormDialog;
*/
