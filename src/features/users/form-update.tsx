import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Form } from 'solid-bootstrap';
import { Component, Setter } from 'solid-js';
import { z } from 'zod';
import { FormFieldInfo } from '~/features/data-forms';
import { useThemeContext } from '~/providers/theme';
import { ApiError, UserRead, UserUpdate, UsersService } from '~/shared/api';
import { log, logError } from '~/shared/utils';

type FormEditUserProps = {
  setComplete: Setter<boolean>;
  user: UserRead;
};

const FormEditUser: Component<FormEditUserProps> = (props) => {
  const layout = useThemeContext();
  const Frm = createForm(() => ({
    defaultValues: {
      username: props.user.username,
      picture: props.user.picture
    },
    onSubmit: async ({ value }) => {
      // compare the values in the value object to the props.client object
      // create an update object with only the changed values
      // send the update object to the API
      let update: UserUpdate = {};
      if (value.username !== props.user.username) update.username = value.username;
      try {
        const response = await UsersService.usersUpdateApiV1UsersUserIdPatch({
          userId: props.user.id,
          requestBody: update
        });
        log('edit user response:', response);
        props.setComplete(true);
      } catch (err: ApiError | Error | any) {
        logError('Error updating user:', err);
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
          name="username"
          validators={{
            onChange: z
              .string()
              .min(5, 'the username must be 5 characters or more')
              .max(255, 'the username must be 255 characters or less')
          }}
          children={(field) => (
            <Form.Group class="mb-3" controlId="editClientForm.ControlInput1">
              <Form.Label>Username</Form.Label>
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
          name="picture"
          validators={{
            onChange: z
              .string()
              .max(1024, 'the picture url must be 1024 characters or less')
          }}
          children={(field) => (
            <Form.Group class="mb-3" controlId="editClientForm.ControlInput2">
              <Form.Label>Picture</Form.Label>
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

export default FormEditUser;
