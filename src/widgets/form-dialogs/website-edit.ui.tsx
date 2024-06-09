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
import { Component, For, Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { fetchClientsList } from '~/entities/clients';
import { SEditWebsite, SchemaEditWebsite } from '~/entities/websites';
import { ClientsService, WebsiteRead, WebsitesService } from '~/shared/api';
import {
  IsValidClientId,
  IsValidWebsiteDomain,
  IsValidWebsiteId,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure
} from '~/shared/db';
import { Dialog } from '~/shared/dialogs';
import { CheckboxInput, TextInput } from '~/shared/forms';
import { EditIcon } from '~/shared/icons';
import { queryClient } from '~/shared/tanstack';

type WebsiteEditFormDialogProps = {
  website: WebsiteRead;
};

const WebsiteEditFormDialog: Component<WebsiteEditFormDialogProps> = (props) => {
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
  const [editWebsiteForm, EditWebsite] = createForm<SEditWebsite>({
    initialValues: {
      websiteId: props.website.id,
      domain: props.website.domain,
      is_secure: props.website.is_secure ?? true,
      is_active: props.website.is_active ?? true,
      clientId: undefined
    },
    validate: valiForm(SchemaEditWebsite)
  });
  const handleSubmit: SubmitHandler<SEditWebsite> = (values) => {
    setPending(true);
    const { websiteId, domain, is_secure, is_active, clientId } = values;
    WebsitesService.websitesUpdateApiV1WebsitesWebsiteIdPatch({
      websiteId: websiteId,
      requestBody: {
        domain: domain !== props.website.domain ? domain : null,
        is_secure: is_secure !== props.website.is_secure ? is_secure : null,
        is_active: is_active !== props.website.is_active ? is_active : null
      }
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
            website_id: websiteId
          }
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
      triggerType="button"
      triggerElm={<EditIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Edit Website: ${props.website.domain}`}
      description={'Fill out the form below to and click save to edit this website.'}
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
              onClick={() => submit(editWebsiteForm)}
            >
              {editWebsiteForm.submitting ? '...' : 'Update Website'}
            </Button>
          </Form.Group>
        </>
      }
    >
      <EditWebsite.Form onSubmit={handleSubmit}>
        <Row>
          <EditWebsite.Field name="websiteId" validate={[valiField(IsValidWebsiteId)]}>
            {(field, props) => (
              <TextInput
                {...props}
                type="hidden"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </EditWebsite.Field>
          <Form.Group as={Col} xs={12} class="mb-2">
            <EditWebsite.Field
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
            </EditWebsite.Field>
          </Form.Group>
          <Form.Group as={Col} xs={6} class="mb-2">
            <Form.Label class="mb-1">Website Is Secure (HTTPS)?</Form.Label>
            <EditWebsite.Field
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
            </EditWebsite.Field>
          </Form.Group>
          <Form.Group as={Col} xs={6} class="mb-2">
            <Form.Label class="mb-1">Website Is Active?</Form.Label>
            <EditWebsite.Field
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
            </EditWebsite.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <EditWebsite.Field name="clientId" validate={[valiField(IsValidClientId)]}>
              {(field) => (
                <>
                  <Form.Label class="mb-1">Assign Website to Client</Form.Label>
                  <Form.Select
                    id={field.name}
                    name={field.name}
                    value={field.value ?? ''}
                    onChange={(e) =>
                      setValue(editWebsiteForm, field.name, e.target.value)
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
            </EditWebsite.Field>
          </Form.Group>
        </Row>
      </EditWebsite.Form>
    </Dialog>
  );
};

export default WebsiteEditFormDialog;
