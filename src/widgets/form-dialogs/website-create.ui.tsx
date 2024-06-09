import {
  SubmitHandler,
  createForm,
  setValue,
  submit,
  valiField,
  valiForm
} from '@modular-forms/solid';
import { createQuery } from '@tanstack/solid-query';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, For, JSX, Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { fetchClientsList } from '~/entities/clients';
import { SCreateWebsite, SchemaCreateWebsite } from '~/entities/websites';
import {
  ClientWebsiteCreate,
  ClientsService,
  WebsiteRead,
  WebsitesService
} from '~/shared/api';
import {
  IsValidClientId,
  IsValidWebsiteDomain,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure
} from '~/shared/db';
import { Dialog, DialogTriggerType } from '~/shared/dialogs';
import { CheckboxInput, TextInput } from '~/shared/forms';
import { queryClient } from '~/shared/tanstack';

type WebsiteCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const WebsiteCreateFormDialog: Component<WebsiteCreateFormDialogProps> = (props) => {
  const clientsQuery = createQuery(() => ({
    queryKey: ['clients', 1, 1000],
    queryFn: fetchClientsList
  }));
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
      clientId: ''
    },
    validate: valiForm(SchemaCreateWebsite)
  });
  const handleSubmit: SubmitHandler<SCreateWebsite> = (values) => {
    setPending(true);
    const { domain, is_secure, is_active, clientId } = values;
    WebsitesService.websitesCreateApiV1WebsitesPost({
      requestBody: {
        domain: domain,
        is_secure: is_secure,
        is_active: is_active
      }
    })
      .then((website: WebsiteRead) => {
        toast.success(`created website: ${website.domain}`);
        ClientsService.clientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost({
          clientId: clientId,
          requestBody: {
            client_id: clientId,
            website_id: website.id
          }
        })
          .then((r: ClientWebsiteCreate) => {
            toast.success(`assigned website to client: ${r.client_id}`);
            setIsSubmitted(true);
          })
          .catch((e) => {
            toast.error(`error assigning website to client: ${e.message}`);
            setIsSubmitted(false);
          });
      })
      .catch((e) => {
        toast.error(`error creating website: ${e.message}`);
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
      title={`Create Website`}
      description={'Fill out the form below to create a new website.'}
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
              onClick={() => submit(createWebsiteForm)}
            >
              {createWebsiteForm.submitting ? '...' : 'Create Website'}
            </Button>
          </Form.Group>
        </>
      }
    >
      <CreateWebsite.Form onSubmit={handleSubmit}>
        <Row>
          <Form.Group as={Col} xs={12} class="mb-2">
            <CreateWebsite.Field
              name="domain"
              validate={[valiField(IsValidWebsiteDomain)]}
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  required
                  label="Website Domain"
                  placeholder="Domain Name"
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateWebsite.Field>
          </Form.Group>
          <Form.Group as={Col} xs={6} class="mb-2">
            <Form.Label class="mb-1">Website Is Secure (HTTPS)?</Form.Label>
            <CreateWebsite.Field
              name="is_secure"
              validate={[valiField(IsValidWebsiteIsSecure)]}
              type="boolean"
            >
              {(field, props) => (
                <CheckboxInput
                  {...props}
                  type="checkbox"
                  required
                  label={field.value ? 'Secure' : 'Insecure'}
                  checked={field.value}
                  error={field.error}
                />
              )}
            </CreateWebsite.Field>
          </Form.Group>
          <Form.Group as={Col} xs={6} class="mb-2">
            <Form.Label class="mb-1">Website Is Active?</Form.Label>
            <CreateWebsite.Field
              name="is_active"
              validate={[valiField(IsValidWebsiteIsActive)]}
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
            </CreateWebsite.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <CreateWebsite.Field
              name="clientId"
              validate={[valiField(IsValidClientId)]}
            >
              {(field) => (
                <>
                  <Form.Label class="mb-1">Assign Website to Client</Form.Label>
                  <Form.Select
                    id={field.name}
                    name={field.name}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      setValue(createWebsiteForm, field.name, e.target.value)
                    }
                    size="sm"
                  >
                    <Show when={clientsQuery.isSuccess}>
                      <For each={clientsQuery.data?.results}>
                        {(client) => (
                          <option
                            selected={field.value === client.id}
                            value={client.id}
                          >
                            {client.title}
                          </option>
                        )}
                      </For>
                    </Show>
                  </Form.Select>
                </>
              )}
            </CreateWebsite.Field>
          </Form.Group>
        </Row>
      </CreateWebsite.Form>
    </Dialog>
  );
};

export default WebsiteCreateFormDialog;
