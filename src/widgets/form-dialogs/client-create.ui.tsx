import {
  SubmitHandler,
  createForm,
  submit,
  valiField,
  valiForm
} from '@modular-forms/solid';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, JSX, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { SCreateClient, SchemaCreateClient } from '~/entities/clients';
import { ClientRead, ClientsService } from '~/shared/api';
import {
  IsValidClientIsActive,
  IsValidDescription,
  IsValidSlug,
  IsValidTitle
} from '~/shared/db';
import { Dialog, DialogTriggerType } from '~/shared/dialogs';
import { CheckboxInput, TextInput, TextareaInput } from '~/shared/forms';
import { queryClient } from '~/shared/tanstack';

type ClientCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const ClientCreateFormDialog: Component<ClientCreateFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [createClientForm, CreateClient] = createForm<SCreateClient>({
    initialValues: {
      slug: '',
      title: '',
      description: undefined,
      is_active: true
    },
    validate: valiForm(SchemaCreateClient)
  });
  const handleSubmit: SubmitHandler<SCreateClient> = (values) => {
    const { slug, title, description, is_active } = values;
    setPending(true);
    ClientsService.clientsCreateApiV1ClientsPost({
      requestBody: {
        title,
        description,
        is_active,
        slug: slug
      }
    })
      .then((r: ClientRead) => {
        toast.success(`created client: ${r.title}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error creating client: ${e.message}`);
        setIsSubmitted(false);
      })
      .finally(() => {
        setPending(false);
      });
  };
  createEffect(() => (isSubmitted() && !pending() ? handleClose() : null));
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
            <Button
              type="submit"
              disabled={pending() || isSubmitted()}
              onClick={() => submit(createClientForm)}
            >
              {createClientForm.submitting ? '...' : 'Create Client'}
            </Button>
          </Form.Group>
        </>
      }
    >
      <CreateClient.Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} xs={12} class="mb-2">
            <CreateClient.Field name="slug" validate={[valiField(IsValidSlug)]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  required
                  label="Data Slug"
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <CreateClient.Field name="title" validate={[valiField(IsValidTitle)]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  required
                  label="Client Name"
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <CreateClient.Field
              name="description"
              validate={[valiField(IsValidDescription)]}
            >
              {(field, props) => (
                <TextareaInput
                  {...props}
                  rows={3}
                  label="Client Description"
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <Form.Label class="mb-1">Client Is Active?</Form.Label>
            <CreateClient.Field
              name="is_active"
              validate={[valiField(IsValidClientIsActive)]}
              type="boolean"
            >
              {(field, props) => (
                <CheckboxInput
                  {...props}
                  type="checkbox"
                  required
                  label={field.value ? 'Active' : 'Inactive'}
                  checked={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </Form.Group>
        </Row>
      </CreateClient.Form>
    </Dialog>
  );
};

export default ClientCreateFormDialog;
