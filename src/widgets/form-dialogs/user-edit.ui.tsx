import {
  createForm,
  submit,
  SubmitHandler,
  valiField,
  valiForm
} from '@modular-forms/solid';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { SchemaEditUser, SEditUser } from '~/entities/users';
import { UserRead, UsersService } from '~/shared/api';
import { IsValidUserId, IsValidUsername } from '~/shared/db';
import { Dialog } from '~/shared/dialogs';
import { TextInput } from '~/shared/forms';
import { EditIcon } from '~/shared/icons';
import { queryClient } from '~/shared/tanstack';

type UserEditFormDialogProps = {
  user: UserRead;
};

const UserEditFormDialog: Component<UserEditFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
    setOpen(false);
  };
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);
  const [loginForm, Login] = createForm<SEditUser>({
    initialValues: {
      userId: props.user.id,
      username: props.user.username,
      picture: props.user.picture
    },
    validate: valiForm(SchemaEditUser)
  });
  const handleSubmit: SubmitHandler<SEditUser> = (values) => {
    setPending(true);
    const { userId, username, picture } = values;
    UsersService.usersUpdateApiV1UsersUserIdPatch({
      userId: userId,
      requestBody: {
        username: username !== props.user.username ? username : null,
        picture: picture !== props.user.picture ? picture : null
      }
    })
      .then((r: UserRead) => {
        toast.success(`updated user: ${r.username}`);
        setIsSubmitted(true);
      })
      .catch((e) => {
        toast.error(`error updating user: ${e.message}`);
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
      title={`Edit User: ${props.user.email}`}
      description={'Fill out the form below to and click save to edit this user.'}
      footerActions={
        <>
          <Form.Group
            as={Col}
            xs={12}
            class="mb-2 d-flex flex-row flex-nowrap justify-content-between"
          >
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              type="submit"
              disabled={pending() || isSubmitted()}
              onClick={() => submit(loginForm)}
            >
              {loginForm.submitting ? '...' : 'Update User'}
            </Button>
          </Form.Group>
        </>
      }
    >
      <Login.Form onSubmit={handleSubmit}>
        <Row>
          <Login.Field name="userId" validate={[valiField(IsValidUserId)]}>
            {(field, props) => (
              <TextInput
                {...props}
                type="hidden"
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Login.Field>
          <Form.Group as={Col} xs={12} class="mb-2">
            <Login.Field name="username" validate={[valiField(IsValidUsername)]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  label="User Name"
                  value={field.value}
                  error={field.error}
                />
              )}
            </Login.Field>
          </Form.Group>
          <Form.Group as={Col} xs={12} class="mb-2">
            <Login.Field name="picture">
              {(field, props) => (
                <TextInput
                  {...props}
                  type="text"
                  label="Profile Picture URL"
                  value={field.value}
                  error={field.error}
                />
              )}
            </Login.Field>
          </Form.Group>
        </Row>
      </Login.Form>
    </Dialog>
  );
};

export default UserEditFormDialog;
