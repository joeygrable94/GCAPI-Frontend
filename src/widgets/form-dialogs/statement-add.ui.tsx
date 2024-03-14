/*
import {
  UploadFile,
  createDropzone,
  fileUploader as fup
} from '@solid-primitives/upload';
import { Card, Col, Form, Row } from 'solid-bootstrap';
import { Component, For, JSX, Show, createMemo, createSignal } from 'solid-js';
import { Dialog } from '~/features/dialogs';
import { useFinancialState } from '~/providers/financials';
import { useThemeContext } from '~/providers/theme';
import { AccountRead, BankRead } from '~/shared/api';
import { CreateIcon, FileUploadIcon } from '~/shared/icons';
import { filterBankAccounts } from '~/shared/utils';
import StatementUploadForm from './statement-upload.ui';

type StatementAddFormDialogProps = {
  title: JSX.Element | string;
  description?: JSX.Element | string;
};

let multipleFileInputRef: HTMLInputElement;

const StatementAddFormDialog: Component<StatementAddFormDialogProps> = (props) => {
  const [finState, finActions] = useFinancialState();
  const theme = useThemeContext();
  const [open, setOpen] = createSignal(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // Bank Account
  const [bank, setBank] = createSignal<BankRead>(finState.banks.results[0]);
  const [account, setAccount] = createSignal<AccountRead>(finState.accounts.results[0]);
  const [bankId, setBankId] = createSignal<string>(finState.banks.results[0]?.id ?? '');
  const [accountId, setAccountId] = createSignal<string>(
    finState.accounts.results[0]?.id ?? ''
  );
  const filteredBankAccounts = createMemo<AccountRead[]>(() => {
    return filterBankAccounts(finState.accounts.results, bankId());
  });
  // File Upload
  const fileUploader = fup;
  const [files, setFiles] = createSignal<UploadFile[]>([]);
  const handleChangeBankId = (e: any) => {
    setBankId(e.target.value);
    setBank(
      finState.banks.results.find((bank) => bank.id === e.target.value) as BankRead
    );
  };
  const handleChangeAccountId = (e: any) => {
    setAccountId(e.target.value);
    setAccount(
      finState.accounts.results.find(
        (account) => account.id === e.target.value
      ) as AccountRead
    );
  };
  const handleChangeFileUpload = (e: any) => {
    multipleFileInputRef.click();
  };
  const { setRef: dropzoneRef, files: droppedFiles } = createDropzone({
    onDrop: async (files: UploadFile[]) => {
      setFiles(files);
    }
  });

  return (
    <Dialog
      size="lg"
      triggerType="button"
      triggerElm={
        <>
          Upload Statements <CreateIcon />
        </>
      }
      open={open}
      setOpen={setOpen}
      handleOpen={handleOpen}
      handleClose={handleClose}
      title={props.title}
      description={props.description}
    >
      <Row>
        <Col xs={6} class="mb-2">
          <Form.Label class="mb-1">Bank</Form.Label>
          <Form.Select
            id="statement-bank-id"
            name="bank_id"
            value={bankId()}
            onChange={handleChangeBankId}
            size="sm"
          >
            <For each={finState.banks.results}>
              {(bank) => (
                <option selected={bankId() === bank.id} value={bank.id}>
                  {bank.name}
                </option>
              )}
            </For>
          </Form.Select>
        </Col>
        <Col xs={6} class="mb-2">
          <Form.Label class="mb-1">Account</Form.Label>
          <Form.Select
            id="statement-account-id"
            name="account_id"
            value={accountId()}
            onChange={handleChangeAccountId}
            size="sm"
          >
            <For each={filteredBankAccounts()}>
              {(account) => (
                <option selected={accountId() === account.id} value={account.id}>
                  {account.name}
                </option>
              )}
            </For>
          </Form.Select>
        </Col>
        <Col xs={12} class="mt-3 mb-2">
          <Card
            class="file-uploader"
            onClick={handleChangeFileUpload}
            ref={dropzoneRef}
          >
            <Card.Body class="text-center">
              <p>Upload statements for this bank account.</p>
              <FileUploadIcon />
              <input
                id="statement-account-id"
                name="statement_select_multiple"
                type="file"
                size="sm"
                hidden
                multiple
                ref={multipleFileInputRef}
                use:fileUploader={{
                  userCallback: (fs) =>
                    fs.forEach((f) =>
                      setFiles((prev) => {
                        if (prev.some((p) => p.name === f.name)) return prev;
                        return [...prev, f];
                      })
                    ),
                  setFiles
                }}
              />
            </Card.Body>
          </Card>
        </Col>
        <Show when={files().length > 0}>
          <Col xs={12} class="mt-3 mb-2 d-flex flex-column align-content-stretch">
            <For each={files()}>
              {(file: UploadFile, index) => (
                <StatementUploadForm
                  index={index}
                  bank={bank()}
                  account={account()}
                  upload={file.file}
                />
              )}
            </For>
          </Col>
        </Show>
      </Row>
    </Dialog>
  );
};

export default StatementAddFormDialog;
*/
