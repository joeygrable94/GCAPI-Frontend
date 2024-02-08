import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Form } from 'solid-bootstrap';
import { Component, Setter } from 'solid-js';
import { z } from 'zod';
import { FormFieldInfo } from '~/features/data-forms';
import { useLayoutContext } from '~/providers/theme';
import { ApiError, WebsitesService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

type FormCreateWebsiteProps = {
  setComplete: Setter<boolean>;
};

const FormCreateWebsite: Component<FormCreateWebsiteProps> = (props) => {
  const layout = useLayoutContext();
  const Frm = createForm(() => ({
    defaultValues: {
      domain: '',
      is_secure: false,
      is_active: true
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await WebsitesService.websitesCreateApiV1WebsitesPost({
          requestBody: value
        });
        log('create website response:', response);
        props.setComplete(true);
      } catch (err: ApiError | Error | any) {
        logError('Error creating website:', err);
      }
    },
    validatorAdapter: zodValidator
  }));

  return (
    <Frm.Provider>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void Frm.handleSubmit();
        }}
      >
        <Frm.Field
          name="domain"
          validators={{
            onChange: z
              .string()
              .min(5, 'the domain must be 5 characters or more')
              .max(255, 'the domain must be 255 characters or less')
          }}
          children={(field) => (
            <Form.Group class="mb-3" controlId="editWebsiteForm.ControlInput1">
              <Form.Label>Domain</Form.Label>
              <Form.Control
                type="text"
                name={field().name}
                value={field().state.value ?? ''}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.value)}
              />
              <FormFieldInfo field={field()} />
            </Form.Group>
          )}
        />
        <Frm.Field
          name="is_secure"
          children={(field) => (
            <Form.Group class="mb-3" controlId="editWebsiteForm.ControlCheckbox1">
              <Form.Label hidden>Is Secure</Form.Label>
              <Form.Check
                type="checkbox"
                label={`Is Secure`}
                name={field().name}
                checked={field().state.value ?? false}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.checked)}
              />
              <FormFieldInfo field={field()} />
            </Form.Group>
          )}
        />
        <Frm.Field
          name="is_active"
          children={(field) => (
            <Form.Group class="mb-3" controlId="editWebsiteForm.ControlCheckbox2">
              <Form.Label hidden>Is Active</Form.Label>
              <Form.Check
                type="checkbox"
                label={`Is Active`}
                name={field().name}
                checked={field().state.value ?? false}
                onBlur={field().handleBlur}
                onInput={(e) => field().handleChange(e.target.checked)}
              />
              <FormFieldInfo field={field()} />
            </Form.Group>
          )}
        />
        <Button
          variant={layout.darkMode ? 'outline-light' : 'outline-dark'}
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </Frm.Provider>
  );
};

export default FormCreateWebsite;