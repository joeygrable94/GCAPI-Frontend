/*
import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, JSX, createSignal } from 'solid-js';
import { z } from 'zod';
import { SEditCategory } from '~/entities/category';
import { FormFieldInfo } from '~/entities/forms';
import { Dialog } from '~/features/dialogs';
import { useFinancialState } from '~/providers/financials';
import { CategoryRead } from '~/shared/api';
import { EditIcon } from '~/shared/icons';

type CategoryEditFormDialogProps = {
  category: CategoryRead;
  title: JSX.Element | string;
  description?: JSX.Element | string;
};

const CategoryEditFormDialog: Component<CategoryEditFormDialogProps> = (props) => {
  const [finState, finActions] = useFinancialState();
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // form
  const Frm = createForm<SEditCategory, typeof zodValidator>(() => ({
    defaultValues: {
      categoryId: props.category.id,
      name: props.category.name,
      description: props.category.description ?? null
    },
    onSubmit: async ({ value, formApi }) => {
      const { categoryId, name, description } = value;
      await finActions.categories.update(categoryId, {
        name: name !== props.category.name ? name : null,
        description: description !== props.category.description ? description : null
      });
      handleClose();
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
      title={props.title}
      description={props.description}
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
                    disabled={!state().canSubmit}
                    onClick={() => Frm.handleSubmit()}
                  >
                    {state().isSubmitting ? '...' : 'Update Category'}
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
                name="categoryId"
                children={(field) => (
                  <Form.Control
                    id={field().name}
                    name={field().name}
                    value={props.category.id}
                    hidden
                  />
                )}
              />
              <Frm.Field
                name="name"
                validators={{
                  onChange: z
                    .string({ required_error: 'Category name is required' })
                    .max(255, 'Cannot exceed 255 characters')
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Category Name</Form.Label>
                      <Form.Control
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Category Name"
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="description"
                validators={{
                  onChange: z
                    .string({ required_error: 'Category description is required' })
                    .max(255, 'Cannot exceed 255 characters')
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Category Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Category Description"
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

export default CategoryEditFormDialog;
*/
