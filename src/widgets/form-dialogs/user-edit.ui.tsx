import { Dialog } from '@getcommunity/gcui/dialog';
import { TextInput } from '@getcommunity/gcui/form-input';
import { EditIcon } from '@getcommunity/gcui/icon';
import { Button } from '@kobalte/core/button';
import {
  createForm,
  submit,
  SubmitHandler,
  valiField,
  valiForm,
} from '@modular-forms/solid';
import { Component, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { SchemaEditUser, SEditUser } from '~/entities/users';
import { UserRead, UsersService } from '~/shared/api';
import { IsValidUserId, IsValidUsername } from '~/shared/db';
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
      picture: props.user.picture,
    },
    validate: valiForm(SchemaEditUser),
  });
  const handleSubmit: SubmitHandler<SEditUser> = (values) => {
    setPending(true);
    const { userId, username, picture } = values;
    UsersService.usersUpdateApiV1UsersUserIdPatch({
      userId: userId,
      requestBody: {
        username: username !== props.user.username ? username : null,
        picture: picture !== props.user.picture ? picture : null,
      },
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
      triggerType='button'
      triggerElm={<EditIcon />}
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={`Edit User: ${props.user.email}`}
      description={'Fill out the form below to and click save to edit this user.'}
      footerActions={
        <div class='justify-content-between mb-2 flex w-full flex-row flex-nowrap'>
          <Button class='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            type='submit'
            disabled={pending() || isSubmitted()}
            onClick={() => submit(loginForm)}
          >
            {loginForm.submitting ? '...' : 'Update User'}
          </Button>
        </div>
      }
    >
      <Login.Form onSubmit={handleSubmit}>
        <div class='columns-1'>
          <Login.Field name='userId' validate={[valiField(IsValidUserId)]}>
            {(field, props) => (
              <TextInput
                {...props}
                type='hidden'
                value={field.value}
                error={field.error}
                required
              />
            )}
          </Login.Field>
          <div class='mb-2 w-full'>
            <Login.Field name='username' validate={[valiField(IsValidUsername)]}>
              {(field, props) => (
                <TextInput
                  {...props}
                  type='text'
                  label='User Name'
                  value={field.value}
                  error={field.error}
                />
              )}
            </Login.Field>
          </div>
          <div class='mb-2 w-full'>
            <Login.Field name='picture'>
              {(field, props) => (
                <TextInput
                  {...props}
                  type='text'
                  label='Profile Picture URL'
                  value={field.value}
                  error={field.error}
                />
              )}
            </Login.Field>
          </div>
        </div>
      </Login.Form>
    </Dialog>
  );
};

export default UserEditFormDialog;
