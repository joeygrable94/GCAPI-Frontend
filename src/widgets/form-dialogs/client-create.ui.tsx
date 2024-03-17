import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, JSX, createSignal } from 'solid-js';
import {
  IsValidClientDescription,
  IsValidClientIsActive,
  IsValidClientTitle,
  SCreateClient
} from '~/entities/clients';
import { Dialog, DialogTriggerType } from '~/features/dialogs';
import { FormFieldInfo } from '~/features/forms';
import { ClientRead, ClientsService } from '~/shared/api';
import { log } from '~/shared/utils';

type ClientCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const ClientCreateFormDialog: Component<ClientCreateFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  // form
  const Frm = createForm<SCreateClient, typeof zodValidator>(() => ({
    defaultValues: {
      title: '',
      description: null,
      is_active: true
    },
    onSubmit: async ({ value, formApi }) => {
      setPending(true);
      ClientsService.clientsCreateApiV1ClientsPost({
        requestBody: value
      })
        .then((r: ClientRead) => {
          log('created client response', r);
          setIsSubmitted(true);
          handleClose();
        })
        .catch((e) => {
          log('error creating client', e);
          setIsSubmitted(false);
        })
        .finally(() => {
          setPending(false);
        });
    },
    validatorAdapter: zodValidator
  }));

  return (
    <Dialog
      triggerType={props.triggerType}
      triggerElm={props.triggerElm}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Create Client`}
      description={'Fill out the form below to create a new client.'}
      footerActions={
        <>
          <Form.Group
            as={Col}
            xs={12}
            class="mb-2 d-flex flex-row flex-nowrap justify-content-between"
          >
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Frm.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting
              })}
              children={(state) => {
                return (
                  <Button
                    type="submit"
                    disabled={!state().canSubmit || pending() || isSubmitted()}
                    onClick={() => Frm.handleSubmit()}
                  >
                    {state().isSubmitting ? '...' : 'Create Client'}
                  </Button>
                );
              }}
            />
          </Form.Group>
        </>
      }
    >
      <Frm.Provider>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void Frm.handleSubmit();
          }}
        >
          <Row>
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="title"
                validators={{
                  onChange: IsValidClientTitle
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Client Name</Form.Label>
                      <Form.Control
                        required
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Client Name"
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="description"
                validators={{
                  onChange: IsValidClientDescription
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Client Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Client Description"
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="is_active"
                validators={{
                  onChange: IsValidClientIsActive
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Client Is Active?</Form.Label>
                      <Form.Check
                        type="switch"
                        required
                        id={field().name}
                        name={field().name}
                        label={field().state.value ? 'Active' : 'Inactive'}
                        checked={field().state.value ?? true}
                        onInput={(e) => field().handleChange(e.target.checked)}
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
          </Row>
        </Form>
      </Frm.Provider>
    </Dialog>
  );
};

export default ClientCreateFormDialog;