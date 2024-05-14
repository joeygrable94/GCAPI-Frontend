import { createForm } from '@tanstack/solid-form';
import { createQuery } from '@tanstack/solid-query';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, For, JSX, Show, createEffect, createSignal } from 'solid-js';
import { fetchClientsList } from '~/entities/clients';
import {
  IsValidWebsiteDomain,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure,
  SCreateWebsite
} from '~/entities/websites';
import {
  ClientWebsiteCreate,
  ClientsService,
  WebsiteRead,
  WebsitesService
} from '~/shared/api';
import { Dialog, DialogTriggerType } from '~/shared/dialogs';
import { FormFieldInfo } from '~/shared/forms';
import { queryClient } from '~/shared/tanstack';
import { log, logError } from '~/shared/utils';

type WebsiteCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const WebsiteCreateFormDialog: Component<WebsiteCreateFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['websites'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const clientsQuery = createQuery(() => ({
    queryKey: ['clients', 1, 1000],
    queryFn: fetchClientsList
  }));
  const Frm = createForm<SCreateWebsite, typeof zodValidator>(() => ({
    defaultValues: {
      domain: '',
      is_secure: true,
      is_active: true,
      clientId: ''
    },
    onSubmit: async ({ value, formApi }) => {
      setPending(true);
      const { domain, is_secure, is_active, clientId } = value;
      WebsitesService.websitesCreateApiV1WebsitesPost({
        requestBody: {
          domain: domain,
          is_secure: is_secure,
          is_active: is_active
        }
      })
        .then((website: WebsiteRead) => {
          log('create website response', website);
          ClientsService.clientsAssignWebsiteApiV1ClientsClientIdAssignWebsitePost({
            clientId: clientId,
            requestBody: {
              client_id: clientId,
              website_id: website.id
            }
          })
            .then((r: ClientWebsiteCreate) => {
              log('assigned website to client response', r);
              setIsSubmitted(true);
            })
            .catch((e) => {
              logError('error assigning website to client', e);
              setIsSubmitted(false);
            });
        })
        .catch((e) => {
          logError('create website error', e);
          setIsSubmitted(false);
        })
        .finally(() => {
          setPending(false);
        });
    },
    validatorAdapter: zodValidator
  }));
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
                    {state().isSubmitting ? '...' : 'Create Website'}
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
                name="domain"
                validators={{
                  onChange: IsValidWebsiteDomain
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Website Domain</Form.Label>
                      <Form.Control
                        required
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Domain Name"
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} class="mb-2">
              <Frm.Field
                name="is_secure"
                validators={{
                  onChange: IsValidWebsiteIsSecure
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Website Is Secure (HTTPS)?</Form.Label>
                      <Form.Check
                        type="switch"
                        required
                        id={field().name}
                        name={field().name}
                        label={field().state.value ? 'Secure' : 'Insecure'}
                        checked={field().state.value ?? true}
                        onInput={(e) => field().handleChange(e.target.checked)}
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={6} class="mb-2">
              <Frm.Field
                name="is_active"
                validators={{
                  onChange: IsValidWebsiteIsActive
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Website Is Active?</Form.Label>
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
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="clientId"
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Assign Website to Client</Form.Label>
                      <Form.Select
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onChange={(e) => field().handleChange(e.target.value)}
                        size="sm"
                      >
                        <Show when={clientsQuery.isSuccess}>
                          <For each={clientsQuery.data?.results}>
                            {(client) => (
                              <option
                                selected={field().state.value === client.id}
                                value={client.id}
                              >
                                {client.title}
                              </option>
                            )}
                          </For>
                        </Show>
                      </Form.Select>
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

export default WebsiteCreateFormDialog;
