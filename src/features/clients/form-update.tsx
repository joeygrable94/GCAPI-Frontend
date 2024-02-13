import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Form } from 'solid-bootstrap';
import { Component, Setter } from 'solid-js';
import { z } from 'zod';
import { FormFieldInfo } from '~/features/data-forms';
import { useThemeContext } from '~/providers/theme';
import { ApiError, ClientRead, ClientUpdate, ClientsService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

type FormEditClientProps = {
  setComplete: Setter<boolean>;
  client: ClientRead;
};

const FormEditClient: Component<FormEditClientProps> = (props) => {
  const layout = useThemeContext();
  const Frm = createForm(() => ({
    defaultValues: {
      title: props.client.title,
      description: props.client.description,
      is_active: props.client.is_active ?? false
    },
    onSubmit: async ({ value }) => {
      // compare the values in the value object to the props.client object
      // create an update object with only the changed values
      // send the update object to the API
      let update: ClientUpdate = {};
      if (value.title !== props.client.title) update.title = value.title;
      if (value.description !== props.client.description)
        update.description = value.description;
      if (value.is_active !== props.client.is_active)
        update.is_active = value.is_active;
      try {
        const response = await ClientsService.clientsUpdateApiV1ClientsClientIdPatch({
          clientId: props.client.id,
          requestBody: update
        });
        log('edit client response:', response);
        props.setComplete(true);
      } catch (err: ApiError | Error | any) {
        logError('Error updating client:', err);
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

export default FormEditClient;
