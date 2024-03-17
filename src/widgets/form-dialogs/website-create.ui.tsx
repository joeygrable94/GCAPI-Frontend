import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, JSX, createSignal } from 'solid-js';
import {
  IsValidWebsiteDomain,
  IsValidWebsiteIsActive,
  IsValidWebsiteIsSecure,
  SCreateWebsite
} from '~/entities/websites';
import { Dialog, DialogTriggerType } from '~/features/dialogs';
import { FormFieldInfo } from '~/features/forms';
import { WebsiteCreateProcessing, WebsitesService } from '~/shared/api';
import { log } from '~/shared/utils';

type WebsiteCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
};

const WebsiteCreateFormDialog: Component<WebsiteCreateFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  // form
  const Frm = createForm<SCreateWebsite, typeof zodValidator>(() => ({
    defaultValues: {
      domain: '',
      is_secure: true,
      is_active: true
    },
    onSubmit: async ({ value, formApi }) => {
      setPending(true);
      WebsitesService.websitesCreateApiV1WebsitesPost({
        requestBody: value
      })
        .then((r: WebsiteCreateProcessing) => {
          log('website created, processing website sitemap', r);
          setIsSubmitted(true);
          handleClose();
        })
        .catch((e) => {
          log('error creating website', e);
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
          </Row>
        </Form>
      </Frm.Provider>
    </Dialog>
  );
};

export default WebsiteCreateFormDialog;
