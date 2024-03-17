import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, createSignal } from 'solid-js';
import {
  IsValidWebsiteDomain,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure,
  SEditWebsite
} from '~/entities/websites';
import { Dialog } from '~/features/dialogs';
import { FormFieldInfo } from '~/features/forms';
import { WebsiteRead, WebsitesService } from '~/shared/api';
import { EditIcon } from '~/shared/icons';
import { log } from '~/shared/utils';

type WebsiteEditFormDialogProps = {
  website: WebsiteRead;
};

const WebsiteEditFormDialog: Component<WebsiteEditFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  // form
  const Frm = createForm<SEditWebsite, typeof zodValidator>(() => ({
    defaultValues: {
      websiteId: props.website.id,
      domain: props.website.domain,
      is_secure: props.website.is_secure ?? true,
      is_active: props.website.is_active ?? true
    },
    onSubmit: async ({ value, formApi }) => {
      setPending(true);
      const { websiteId, domain, is_secure, is_active } = value;
      WebsitesService.websitesUpdateApiV1WebsitesWebsiteIdPatch({
        websiteId: websiteId,
        requestBody: {
          domain: domain !== props.website.domain ? domain : null,
          is_secure: is_secure !== props.website.is_secure ? is_secure : null,
          is_active: is_active !== props.website.is_active ? is_active : null
        }
      })
        .then((r: WebsiteRead) => {
          log('updated website response', r);
          setIsSubmitted(true);
          handleClose();
        })
        .catch((e) => {
          log('error updating website', e);
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
                    {state().isSubmitting ? '...' : 'Update Website'}
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
                name="websiteId"
                children={(field) => (
                  <Form.Control
                    required
                    id={field().name}
                    name={field().name}
                    value={props.website.id}
                    hidden
                  />
                )}
              />
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
                        required
                        type="switch"
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
                        required
                        type="switch"
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

export default WebsiteEditFormDialog;
