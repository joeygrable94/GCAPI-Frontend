import { Button } from '@kobalte/core/button';
import {
  SubmitHandler,
  createForm,
  submit,
  valiField,
  valiForm
} from '@modular-forms/solid';
import { Component, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { SEditClient, SchemaEditClient } from '~/entities/clients';
import { ClientRead, ClientsService } from '~/shared/api';
import {
  IsValidClientId,
  IsValidClientIsActive,
  IsValidDescription,
  IsValidTitle
} from '~/shared/db';
import { queryClient } from '~/shared/tanstack';
import { Dialog } from '~/shared/ui/dialog';
import { CheckboxInput, TextInput } from '~/shared/ui/form-input';
import { EditIcon } from '~/shared/ui/icon';

type ClientEditFormDialogProps = {
  client: ClientRead;
};

const ClientEditFormDialog: Component<ClientEditFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['clients'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [editClientForm, EditClient] = createForm<SEditClient>({
    initialValues: {
      clientId: props.client.id,
      title: props.client.title,
      description: props.client.description ?? undefined,
      is_active: props.client.is_active ?? undefined
    },
    validate: valiForm(SchemaEditClient)
  });
  const handleSubmit: SubmitHandler<SEditClient> = (values) => {
    setPending(true);
    const { clientId, title, description, is_active } = values;
    ClientsService.clientsUpdateApiV1ClientsClientIdPatch({
      clientId: clientId,
      requestBody: {
        title: title !== props.client.title ? title : null,
        description: description !== props.client.description ? description : null,
        is_active: is_active !== props.client.is_active ? is_active : null
      }
    })
      .then((r: ClientRead) => {
        toast.success(`updated client: ${r.title}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error updating client: ${e.message}`);
        setIsSubmitted(false);
      })
      .finally(() => {
        setPending(false);
      });
  };
  createEffect(() => (isSubmitted() && !pending() ? handleClose() : null));
  return (
    <Dialog
      triggerType="button"
      triggerElm={<EditIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Edit Client: ${props.client.title}`}
      description={'Fill out the form below to and click save to edit this client.'}
      footerActions={
        <div class="justify-content-between mb-2 flex w-full flex-row flex-nowrap">
          <Button class="secondary" onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            type="submit"
            disabled={pending() || isSubmitted()}
            onClick={() => submit(editClientForm)}
          >
            {editClientForm.submitting ? '...' : 'Update Client'}
          </Button>
        </div>
      }
    >
      <EditClient.Form onSubmit={handleSubmit}>
        <div class="columns-1">
          <EditClient.Field name="clientId" validate={[valiField(IsValidClientId)]}>
            {(field, props) => (
              <TextInput
                {...props}
                type="hidden"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </EditClient.Field>
          <div class="mb-2 w-full">
            <EditClient.Field name="title" validate={[valiField(IsValidTitle)]}>
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
            </EditClient.Field>
          </div>
          <div class="mb-2 w-full">
            <EditClient.Field
              name="description"
              validate={[valiField(IsValidDescription)]}
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  rows={3}
                  label="Client Description"
                  value={field.value}
                  error={field.error}
                />
              )}
            </EditClient.Field>
          </div>
          <div class="mb-2 w-full">
            <label class="mb-1">Client Is Active?</label>
            <EditClient.Field
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
            </EditClient.Field>
          </div>
        </div>
      </EditClient.Form>
    </Dialog>
  );
};

export default ClientEditFormDialog;
