/*
import { createForm } from '@tanstack/solid-form';
import { zodValidator } from '@tanstack/zod-form-adapter';
import { Button, Col, Form, Row } from 'solid-bootstrap';
import { Component, For, JSX, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { z } from 'zod';
import { FormFieldInfo } from '~/entities/forms';
import { SEditStatement } from '~/entities/statement';
import { Dialog } from '~/features/dialogs';
import { useFinancialState } from '~/providers/financials';
import { StatementRead } from '~/shared/api';
import { EditIcon } from '~/shared/icons';

type StatementEditFormDialogProps = {
  statement: StatementRead;
  title: JSX.Element | string;
  description?: JSX.Element | string;
};

const StatementEditFormDialog: Component<StatementEditFormDialogProps> = (props) => {
  const [finState, finActions] = useFinancialState();
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // form
  const Frm = createForm<SEditStatement, typeof zodValidator>(() => ({
    defaultValues: {
      statementId: props.statement.id,
      name: props.statement.name,
      description: props.statement.description ?? null,
      tags: props.statement.tags?.map((v) => v.id) ?? []
    },
    onSubmit: async ({ value, formApi }) => {
      const { statementId, name, description } = value;
      finActions.statements.update(statementId, {
        name: name !== props.statement.name ? name : null,
        description: description !== props.statement.description ? description : null
      });
      const assignTags =
        value.tags?.filter((tagId) => tagId).map((tagId) => ({ statementId, tagId })) ||
        [];
      const tagReponse = await Promise.all(
        assignTags.map((tag) =>
          finActions.statements.assignTag(tag.statementId, tag.tagId)
        )
      );
      const tagsSaved = tagReponse.every((v) => v !== undefined);
      if (assignTags.length > 0 && tagsSaved) {
        toast.success(`Saved ${assignTags.length} statement tags`);
        handleClose();
      }
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
                    {state().isSubmitting ? '...' : 'Update Statement'}
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
                name="statementId"
                children={(field) => (
                  <Form.Control
                    id={field().name}
                    name={field().name}
                    value={props.statement.id}
                    hidden
                  />
                )}
              />
              <Frm.Field
                name="name"
                validators={{
                  onChange: z
                    .string({ required_error: 'Statement name is required' })
                    .max(255, 'Cannot exceed 255 characters')
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Statement Name</Form.Label>
                      <Form.Control
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Statement Name"
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
                    .string({ required_error: 'Statement description is required' })
                    .max(255, 'Cannot exceed 255 characters')
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Statement Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        id={field().name}
                        name={field().name}
                        value={field().state.value ?? ''}
                        onBlur={field().handleBlur}
                        onInput={(e) => field().handleChange(e.target.value)}
                        placeholder="Statement Description"
                      />
                      <FormFieldInfo field={field()} />
                    </>
                  );
                }}
              />
            </Form.Group>
            <Form.Group as={Col} xs={12} class="mb-2">
              <Frm.Field
                name="tags"
                validators={{
                  onChange: z.array(z.string())
                }}
                children={(field) => {
                  return (
                    <>
                      <Form.Label class="mb-1">Tags</Form.Label>
                      <Form.Select
                        id={field().name}
                        name={field().name}
                        multiple
                        value={field().state.value ?? []}
                        onChange={(e) =>
                          field().handleChange(
                            Array.from(e.target.selectedOptions).map(
                              (option) => option.value
                            )
                          )
                        }
                        size="sm"
                        style={{
                          'min-height': '200px'
                        }}
                      >
                        <For each={finState.tags.results}>
                          {(tag) => (
                            <option
                              selected={field().state.value?.includes(tag.id)}
                              value={tag.id}
                            >
                              {tag.name}
                            </option>
                          )}
                        </For>
                      </Form.Select>
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

export default StatementEditFormDialog;
*/
