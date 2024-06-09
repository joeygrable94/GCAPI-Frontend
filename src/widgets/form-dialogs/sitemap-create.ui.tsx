import {
  SubmitHandler,
  createForm,
  submit,
  valiField,
  valiForm
} from '@modular-forms/solid';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, JSX, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { SCreateWebsiteSitemap, SchemaCreateWebsiteSitemap } from '~/entities/sitemaps';
import { WebsiteMapRead, WebsiteRead, WebsiteSitemapsService } from '~/shared/api';
import {
  IsValidWebsiteId,
  IsValidWebsiteSitemapIsActive,
  IsValidWebsiteSitemapUrl
} from '~/shared/db';
import { Dialog, DialogTriggerType } from '~/shared/dialogs';
import { CheckboxInput, TextInput } from '~/shared/forms';
import { queryClient } from '~/shared/tanstack';

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
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['websiteSitemaps'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [createWebsiteSitemapForm, CreateWebsiteSitemap] =
    createForm<SCreateWebsiteSitemap>({
      initialValues: {
        url: '',
        is_active: true,
        website_id: props.website.id
      },
      validate: valiForm(SchemaCreateWebsiteSitemap)
    });
  const handleSubmit: SubmitHandler<SCreateWebsiteSitemap> = (values) => {
    setPending(true);
    WebsiteSitemapsService.websiteSitemapsCreateApiV1SitemapsPost({
      requestBody: values
    })
      .then((r: WebsiteMapRead) => {
        toast.success(`created website sitemap: ${r.url}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error creating website sitemap: ${e.message}`);
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
            <Button
              type="submit"
              disabled={
                pending() || isSubmitted() || createWebsiteSitemapForm.submitting
              }
              onClick={() => submit(createWebsiteSitemapForm)}
            >
              {createWebsiteSitemapForm.submitting ? '...' : 'Create Website Sitemap'}
            </Button>
          </Form.Group>
        </>
      }
    >
      <CreateWebsiteSitemap.Form onSubmit={handleSubmit}>
        <Row>
          <CreateWebsiteSitemap.Field
            name="website_id"
            validate={[valiField(IsValidWebsiteId)]}
          >
            {(field, props) => (
              <TextInput
                {...props}
                type="hidden"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </CreateWebsiteSitemap.Field>
          <Form.Group as={Col} xs={12} class="mb-2">
            <CreateWebsiteSitemap.Field
              name="url"
              validate={[valiField(IsValidWebsiteSitemapUrl)]}
            >
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  required
                  label="Website Sitemap URL"
                  placeholder="https://example.com/sitemap.xml"
                  value={field.value}
                  error={field.error}
                />
              )}
            </CreateWebsiteSitemap.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <Form.Label class="mb-1">Website Sitemap Is Active?</Form.Label>
            <CreateWebsiteSitemap.Field
              name="is_active"
              validate={[valiField(IsValidWebsiteSitemapIsActive)]}
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
            </CreateWebsiteSitemap.Field>
          </Form.Group>
        </Row>
      </CreateWebsiteSitemap.Form>
    </Dialog>
  );
};

export default WebsiteSitemapCreateFormDialog;
