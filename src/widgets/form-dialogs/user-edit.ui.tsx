import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, createSignal } from 'solid-js';
import { IsValidUserPicture, IsValidUserUsername, SEditUser } from '~/entities/users';
import { UserRead, UsersService } from '~/shared/api';
import { Dialog } from '~/shared/dialogs';
import { FormFieldInfo } from '~/shared/forms';
import { EditIcon } from '~/shared/icons';
import { log } from '~/shared/utils';

type UserEditFormDialogProps = {
  user: UserRead;
};

const UserEditFormDialog: Component<UserEditFormDialogProps> = (props) => {
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pending, setPending] = createSignal(false);
  const [isSubmitted, setIsSubmitted] = createSignal(false);

  // form
  const Frm = createForm<SEditUser, typeof zodValidator>(() => ({
    defaultValues: {
      userId: props.user.id,
      username: props.user.username,
      picture: props.user.picture
    },
    onSubmit: async ({ value, formApi }) => {
      setPending(true);
      const { userId, username, picture } = value;
      UsersService.usersUpdateApiV1UsersUserIdPatch({
        userId: userId,
        requestBody: {
          username: username !== props.user.username ? username : null,
          picture: picture !== props.user.picture ? picture : null
        }
      })
        .then((r: UserRead) => {
          log('updated user response', r);
          setIsSubmitted(true);
          handleClose();
        })
        .catch((e) => {
          log('error updating user', e);
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
      title={`Edit User: ${props.user.email}`}
      description={'Fill out the form below to and click save to edit this user.'}
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
                    {state().isSubmitting ? '...' : 'Update User'}
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
                name="userId"
                children={(field) => (
                  <Form.Control
                    required
                    id={field().name}
                    name={field().name}
                    value={props.user.id}
                    hidden
                  />
                )}
              />
              <Frm.Field
                name="username"
                validators={{
                  onChange: IsValidUserUsername
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">User Name</Form.Label>
                      <Form.Control
                        required
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="User Name"
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="picture"
                validators={{
                  onChange: IsValidUserPicture
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Profile Picture URL</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Profile Picture URL"
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

export default UserEditFormDialog;
