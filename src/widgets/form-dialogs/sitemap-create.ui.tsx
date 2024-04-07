import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, JSX, createEffect, createSignal } from 'solid-js';
import {
  IsValidWebsiteSitemapIsActive,
  IsValidWebsiteSitemapUrl,
  SCreateWebsiteSitemap
} from '~/entities/sitemaps';
import { WebsiteMapRead, WebsiteRead, WebsiteSitemapsService } from '~/shared/api';
import { Dialog, DialogTriggerType } from '~/shared/dialogs';
import { FormFieldInfo } from '~/shared/forms';
import { log } from '~/shared/utils';

type WebsiteSitemapCreateFormDialogProps = {
  triggerType: DialogTriggerType;
  triggerElm: JSX.Element;
  website: WebsiteRead;
};

const WebsiteSitemapCreateFormDialog: Component<WebsiteSitemapCreateFormDialogProps> = (
  props
) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  createEffect(() => {
    log('form submitted', isSubmitted());
    log('form pending', pending());
  });

  // form
  const Frm = createForm<SCreateWebsiteSitemap, typeof zodValidator>(() => ({
    defaultValues: {
      url: '',
      is_active: true,
      website_id: props.website.id
    },
    onSubmit: async ({ value, formApi }) => {
      setPending(true);
      WebsiteSitemapsService.websiteSitemapsCreateApiV1SitemapsPost({
        requestBody: value
      })
        .then((r: WebsiteMapRead) => {
          log('created website sitemap response', r);
          setIsSubmitted(true);
          handleClose();
        })
        .catch((e) => {
          log('error creating website sitemap', e);
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
      title={`Create Website Sitemap`}
      description={'Fill out the form below to create a new sitemap.'}
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
                    {state().isSubmitting ? '...' : 'Create Website Sitemap'}
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
                name="website_id"
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
                name="url"
                validators={{
                  onChange: IsValidWebsiteSitemapUrl
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Website Sitemap URL</Form.Label>
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
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="is_active"
                validators={{
                  onChange: IsValidWebsiteSitemapIsActive
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Website Sitemap Is Active?</Form.Label>
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

export default WebsiteSitemapCreateFormDialog;
