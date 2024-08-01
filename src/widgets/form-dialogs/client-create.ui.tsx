import { Dialog, DialogTriggerType } from '@getcommunity/gcui/dialog';
import { CheckboxInput, TextInput } from '@getcommunity/gcui/form-input';
import { Button } from '@kobalte/core/button';
import {
  SubmitHandler,
  createForm,
  submit,
  valiField,
  valiForm,
} from '@modular-forms/solid';
import { Component, JSX, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { SCreateClient, SchemaCreateClient } from '~/entities/clients';
import { ClientRead, ClientsService } from '~/shared/api';
import {
  IsValidClientIsActive,
  IsValidDescription,
  IsValidSlug,
  IsValidTitle,
} from '~/shared/db';
import { queryClient } from '~/shared/tanstack';

type ClientCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const ClientCreateFormDialog: Component<ClientCreateFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient
      .invalidateQueries({ queryKey: ['clients'] })
      .then(() => {})
      .catch(() => {});
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [createClientForm, CreateClient] = createForm<SCreateClient>({
    initialValues: {
      slug: '',
      title: '',
      description: undefined,
      is_active: true,
    },
    validate: valiForm(SchemaCreateClient),
  });
  const handleSubmit: SubmitHandler<SCreateClient> = (values) => {
    const { slug, title, description, is_active } = values;
    setPending(true);
    ClientsService.clientsCreateApiV1ClientsPost({
      requestBody: {
        title,
        description,
        is_active,
        slug: slug,
      },
    })
      .then((r: ClientRead) => {
        toast.success(`created client: ${r.title}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        console.error(e);
        toast.error(`error creating client: ${e}`);
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
        <div class='justify-content-between mb-2 flex w-full flex-row flex-nowrap'>
          <Button class='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            type='submit'
            disabled={pending() || isSubmitted()}
            onClick={() => submit(createClientForm)}
          >
            {createClientForm.submitting ? '...' : 'Create Client'}
          </Button>
        </div>
      }
    >
      <CreateClient.Form onSubmit={handleSubmit}>
        <div class='columns-1'>
          <div class='mb-2 w-full'>
            <CreateClient.Field name='slug' validate={[valiField(IsValidSlug)]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  type='text'
                  required
                  label='Data Slug'
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </div>
          <div class='mb-2 w-full'>
            <CreateClient.Field name='title' validate={[valiField(IsValidTitle)]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  type='text'
                  required
                  label='Client Name'
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </div>
          <div class='mb-2 w-full'>
            <CreateClient.Field
              name='description'
              validate={[valiField(IsValidDescription)]}
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  rows={3}
                  label='Client Description'
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </div>
          <div class='mb-2 w-full'>
            <label class='mb-1'>Client Is Active?</label>
            <CreateClient.Field
              name='is_active'
              validate={[valiField(IsValidClientIsActive)]}
              type='boolean'
            >
              {(field, props) => (
                <CheckboxInput
                  {...props}
                  type='checkbox'
                  required
                  label={field.value ? 'Active' : 'Inactive'}
                  checked={field.value}
                  error={field.error}
                />
              )}
            </CreateClient.Field>
          </div>
        </div>
      </CreateClient.Form>
    </Dialog>
  );
};

export default ClientCreateFormDialog;
