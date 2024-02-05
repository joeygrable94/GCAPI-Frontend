import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Form } from 'solid-bootstrap';
import { Component, Setter } from 'solid-js';
import { z } from 'zod';
import { FormFieldInfo } from '~/features/data-forms';
import { useLayoutContext } from '~/providers/theme';
import { ApiError, ClientsService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

type FormCreateClientProps = {
  setComplete: Setter<boolean>;
};

const FormCreateClient: Component<FormCreateClientProps> = (props) => {
  const layout = useLayoutContext();
  const Frm = createForm(() => ({
    defaultValues: {
      title: '',
      description: '',
      is_active: true
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await ClientsService.clientsCreateApiV1ClientsPost({
          requestBody: value
        });
        log('create client response:', response);
        props.setComplete(true);
      } catch (err: ApiError | Error | any) {
        logError('Error creating client:', err);
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
          name="title"
          validators={{
            onChange: z
              .string()
              .min(5, 'the title must be 5 characters or more')
              .max(96, 'the title must be 96 characters or less')
          }}
          children={(field) => (
            <Form.Group class="mb-3" controlId="editClientForm.ControlInput1">
              <Form.Label>Title</Form.Label>
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
          name="description"
          validators={{
            onChange: z
              .string()
              .max(96, 'the description must 5000 characters or less')
              .optional()
          }}
          children={(field) => (
            <Form.Group class="mb-3" controlId="editClientForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
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
          name="is_active"
          children={(field) => (
            <Form.Group class="mb-3" controlId="editClientForm.ControlCheckbox1">
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

export default FormCreateClient;
