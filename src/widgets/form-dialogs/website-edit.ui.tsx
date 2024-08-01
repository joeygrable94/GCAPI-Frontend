import { Dialog } from '@getcommunity/gcui/dialog';
import { CheckboxInput, TextInput } from '@getcommunity/gcui/form-input';
import { EditIcon } from '@getcommunity/gcui/icon';
import { Button } from '@kobalte/core/button';
import {
  SubmitHandler,
  createForm,
  setValue,
  submit,
  valiField,
  valiForm,
} from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Component, For, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { fetchClientsList } from '~/entities/clients';
import { SEditWebsite, SchemaEditWebsite } from '~/entities/websites';
import { ClientRead, ClientsService, WebsiteRead, WebsitesService } from '~/shared/api';
import {
  IsValidClientId,
  IsValidWebsiteDomain,
  IsValidWebsiteId,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure,
} from '~/shared/db';
import { queryClient } from '~/shared/tanstack';

type WebsiteEditFormDialogProps = {
  website: WebsiteRead;
};

const WebsiteEditFormDialog: Component<WebsiteEditFormDialogProps> = (props) => {
  const clientsQuery = createQuery(() => ({
    queryKey: ['clients', 1, 1000],
    queryFn: fetchClientsList,
  }));
  const [clientsData, setClientsData] = createSignal<ClientRead[]>([]);
  createEffect(() => {
    if (clientsQuery.data !== undefined && clientsQuery.data !== null) {
      setClientsData(clientsQuery.data.results.map((r: ClientRead) => r));
    }
  });
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['websites'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [editWebsiteForm, EditWebsite] = createForm<SEditWebsite>({
    initialValues: {
      websiteId: props.website.id,
      domain: props.website.domain,
      is_secure: props.website.is_secure ?? true,
      is_active: props.website.is_active ?? true,
      clientId: undefined,
    },
    validate: valiForm(SchemaEditWebsite),
  });
  const handleSubmit: SubmitHandler<SEditWebsite> = (values) => {
    setPending(true);
    const { websiteId, domain, is_secure, is_active, clientId } = values;
    WebsitesService.websitesUpdateApiV1WebsitesWebsiteIdPatch({
      websiteId: websiteId,
      requestBody: {
        domain: domain !== props.website.domain ? domain : null,
        is_secure: is_secure !== props.website.is_secure ? is_secure : null,
        is_active: is_active !== props.website.is_active ? is_active : null,
      },
    })
      .then((r: WebsiteRead) => {
        toast.success(`updated website: ${r.domain}`);
        if (clientId === null) {
          setIsSubmitted(true);
          return;
        }
        ClientsService.clientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost({
          clientId: clientId,
          requestBody: {
            client_id: clientId,
            website_id: websiteId,
          },
        })
          .then((r) => {
            toast.success(`assigned website to client: ${r.client_id}`);
            setIsSubmitted(true);
          })
          .catch((e) => {
            toast.error(`error assigning website to client: ${e.message}`);
            setIsSubmitted(false);
          });
      })
      .catch((e) => {
        toast.error(`error updating website: ${e.message}`);
        setIsSubmitted(false);
      })
      .finally(() => {
        setPending(false);
      });
  };
  createEffect(() => (isSubmitted() && !pending() ? handleClose() : null));
  return (
    <Dialog
      triggerType='button'
      triggerElm={<EditIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Edit Website: ${props.website.domain}`}
      description={'Fill out the form below to and click save to edit this website.'}
      footerActions={
        <div class='justify-content-between mb-2 flex w-full flex-row flex-nowrap'>
          <Button class='secondary' onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            type='submit'
            disabled={pending() || isSubmitted()}
            onClick={() => submit(editWebsiteForm)}
          >
            {editWebsiteForm.submitting ? '...' : 'Update Website'}
          </Button>
        </div>
      }
    >
      <EditWebsite.Form onSubmit={handleSubmit}>
        <div class='columns-1'>
          <EditWebsite.Field name='websiteId' validate={[valiField(IsValidWebsiteId)]}>
            {(field, props) => (
              <TextInput
                {...props}
                type='hidden'
                value={field.value}
                error={field.error}
                required
              />
            )}
          </EditWebsite.Field>
          <div class='mb-2 w-full'>
            <EditWebsite.Field
              name='domain'
              validate={[valiField(IsValidWebsiteDomain)]}
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  type='text'
                  required
                  label='Website Domain'
                  placeholder='Domain Name'
                  value={field.value}
                  error={field.error}
                />
              )}
            </EditWebsite.Field>
          </div>
          <div class='mb-2 w-full'>
            <label class='mb-1'>Website Is Secure (HTTPS)?</label>
            <EditWebsite.Field
              name='is_secure'
              validate={[valiField(IsValidWebsiteIsSecure)]}
              type='boolean'
            >
              {(field, props) => (
                <CheckboxInput
                  {...props}
                  type='checkbox'
                  required
                  label={field.value ? 'Secure' : 'Insecure'}
                  checked={field.value}
                  error={field.error}
                />
              )}
            </EditWebsite.Field>
          </div>
          <div class='mb-2 w-full'>
            <label class='mb-1'>Website Is Active?</label>
            <EditWebsite.Field
              name='is_active'
              validate={[valiField(IsValidWebsiteIsActive)]}
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
            </EditWebsite.Field>
          </div>
          <div class='mb-2 w-full'>
            <EditWebsite.Field name='clientId' validate={[valiField(IsValidClientId)]}>
              {(field) => (
                <>
                  <label class='mb-1'>Assign Website to Client</label>
                  <select
                    id={field.name}
                    name={field.name}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      setValue(editWebsiteForm, field.name, e.target.value)
                    }
                    size='sm'
                  >
                    <For each={clientsData()}>
                      {(client) => (
                        <option selected={field.value === client.id} value={client.id}>
                          {client.title}
                        </option>
                      )}
                    </For>
                  </select>
                </>
              )}
            </EditWebsite.Field>
          </div>
        </div>
      </EditWebsite.Form>
    </Dialog>
  );
};

export default WebsiteEditFormDialog;
