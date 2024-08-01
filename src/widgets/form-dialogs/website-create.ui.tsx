import { Button } from '@getcommunity/gcui/button';
import { Dialog, DialogTriggerType } from '@getcommunity/gcui/dialog';
import {
  CheckboxInput,
  CheckboxSwitchInput,
  SelectInput,
  TextInput,
} from '@getcommunity/gcui/form-input';
import {
  SubmitHandler,
  createForm,
  setValue,
  submit,
  valiField,
  valiForm,
} from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Component, JSX, createEffect, createSignal } from 'solid-js';
import { fetchClientsList } from '~/entities/clients';
import { SCreateWebsite, SchemaCreateWebsite } from '~/entities/websites';
import { ClientRead } from '~/shared/api';
import {
  IsValidWebsiteDomain,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure,
} from '~/shared/db';
import { queryClient } from '~/shared/tanstack';

type WebsiteCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const WebsiteCreateFormDialog: Component<WebsiteCreateFormDialogProps> = (props) => {
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
  const [createWebsiteForm, CreateWebsite] = createForm<SCreateWebsite>({
    initialValues: {
      domain: '',
      is_secure: true,
      is_active: true,
      clientId: undefined,
    },
    validate: valiForm(SchemaCreateWebsite),
  });
  const handleSubmit: SubmitHandler<SCreateWebsite> = (values) => {
    console.log('Submitting...', values);
    return;
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
      title={`Create Website`}
      description={'Fill out the form below to create a new website.'}
      footerActions={
        <div class='mb-2 flex w-full flex-nowrap justify-between'>
          <Button color='light' onClick={() => handleClose()}>
            Close
          </Button>
          <Button
            color='info'
            disabled={pending() || isSubmitted()}
            onClick={() => submit(createWebsiteForm)}
          >
            {createWebsiteForm.submitting ? '...' : 'Create Website'}
          </Button>
        </div>
      }
    >
      <CreateWebsite.Form onSubmit={handleSubmit}>
        <div class='columns-1'>
          <div class='mb-2 w-full'>
            <CreateWebsite.Field
              name='domain'
              validate={[valiField(IsValidWebsiteDomain)]}
            >
              {(field, props) => (
                <TextInput
                  type='text'
                  value={field.value ?? ''}
                  defaultValue=''
                  name={field.name}
                  label='Website Domain'
                  required={true}
                  description='Enter a domain name like "example.com" or "subdomain.example.com".'
                  error={field.error}
                  disabled={pending() || isSubmitted()}
                  onChange={(value: string | null) =>
                    setValue(createWebsiteForm, field.name, value ?? '')
                  }
                />
              )}
            </CreateWebsite.Field>
          </div>
          <div class='mb-2 w-full'>
            <CreateWebsite.Field
              name='is_secure'
              validate={[valiField(IsValidWebsiteIsSecure)]}
              type='boolean'
            >
              {(field, props) => (
                <CheckboxSwitchInput
                  value={field.value ? '1' : '0'}
                  checked={field.value}
                  defaultChecked={true}
                  name={field.name}
                  label={field.value ? 'Is Secure' : 'Is Insecure'}
                  required={true}
                  description='Check this box if the website uses HTTPS.'
                  error={field.error}
                  disabled={pending() || isSubmitted()}
                  onChange={(checked: boolean) =>
                    setValue(createWebsiteForm, field.name, checked)
                  }
                />
              )}
            </CreateWebsite.Field>
          </div>
          <div class='mb-2 w-full'>
            <CreateWebsite.Field
              name='is_active'
              validate={[valiField(IsValidWebsiteIsActive)]}
              type='boolean'
            >
              {(field, props) => (
                <CheckboxInput
                  name={field.name}
                  value={field.value ? '1' : '0'}
                  checked={field.value}
                  defaultChecked={true}
                  label={field.value ? 'Is Active' : 'Is Inactive'}
                  required={true}
                  description='Is the website active?'
                  error={field.error}
                  disabled={pending() || isSubmitted()}
                  onChange={(checked: boolean) =>
                    setValue(createWebsiteForm, field.name, checked)
                  }
                />
              )}
            </CreateWebsite.Field>
          </div>
          <div class='mb-2 w-full'>
            <CreateWebsite.Field name='clientId'>
              {(field) => {
                return (
                  <SelectInput<ClientRead>
                    label='Assign Website to Client'
                    name={field.name}
                    value={clientsData().filter((c) => c.id === field.value)[0] ?? null}
                    options={clientsData() ?? []}
                    optionValue='id'
                    optionTextValue='title'
                    optionDisabled={(option: ClientRead) => option.is_active === false}
                    triggerLabel='Clients'
                    placeholder='Select a Client'
                    error={field.error}
                    disabled={pending() || isSubmitted()}
                    onChange={(value) =>
                      setValue(createWebsiteForm, field.name, value?.id as string)
                    }
                  />
                );
              }}
            </CreateWebsite.Field>
          </div>
        </div>
      </CreateWebsite.Form>
    </Dialog>
  );
};

export default WebsiteCreateFormDialog;
