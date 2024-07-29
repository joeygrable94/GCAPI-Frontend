import { SliderGetValueLabelParams } from '@kobalte/core/slider';
import { createQuery } from '@tanstack/solid-query';
import { Component, Show, createEffect, createMemo, createSignal } from 'solid-js';
import { fetchClientsList } from '~/entities/clients';
import { ClientRead } from '~/shared/api';
import {
  CheckboxInput,
  CheckboxSwitchInput,
  ComboboxInput,
  ComboboxMultiInput,
  NumberInput,
  NumberRangeInput,
  RadioGroupInput,
  SelectInput,
  SelectMultipleInput,
  TextInput
} from '~/shared/ui/form-input';

const FormInputsExample: Component = () => {
  const clientsQuery = createQuery(() => ({
    queryKey: ['clients', 1, 1000],
    queryFn: fetchClientsList
  }));
  const [selectedClient, setSelectedClient] = createSignal<ClientRead>();
  const [selectedMultiClients, setSelectedMultiClients] = createSignal<ClientRead[]>();
  const [comboboxClient, setComboboxClient] = createSignal<ClientRead>();
  const [comboboxMultiClients, setComboboxMultiClients] = createSignal<ClientRead[]>();
  const [clientsData, setClientsData] = createSignal<ClientRead[]>([]);
  createEffect(() => {
    if (clientsQuery.data !== undefined && clientsQuery.data !== null) {
      setClientsData(clientsQuery.data.results.map((r: ClientRead) => r));
    }
  });
  const [textInput, setTextInput] = createSignal<string>('');
  const [textareaInput, setTextareaInput] = createSignal<string>('');
  const [numberInput, setNumberInput] = createSignal<number>(101);
  const [checkboxSwitchInput, setCheckboxSwitchInput] = createSignal<boolean>(false);
  const [checkboxInput, setCheckboxInput] = createSignal<boolean>(false);
  const numberError = createMemo(() => {
    return numberInput() > 100 ? 'Value must be less than 100.' : undefined;
  });
  const [radioInput, setRadioInput] = createSignal<string>('');
  const radioInputError = createMemo(() => {
    if (radioInput() === '') return 'This field is required.';
    if (radioInput() === 'Apples') return 'Apples are not allowed.';
    return undefined;
  });
  const [rangeInput, setRangeInput] = createSignal<number[]>([40]);
  const rangeInputError = createMemo(() => {
    return rangeInput()[0] < 50 ? 'Value must be greater than 50.' : undefined;
  });
  const [rangeInputToo, setRangeInputToo] = createSignal<number[]>([24, 76]);
  const rangeInputTooError = createMemo(() => {
    let errorMsg: string | undefined = undefined;
    if (rangeInputToo()[0] < 25) {
      if (errorMsg === undefined) errorMsg = '';
      errorMsg += 'Minimum value must be greater than 25. ';
    }
    if (rangeInputToo()[1] > 75) {
      if (errorMsg === undefined) errorMsg = '';
      errorMsg += 'Maximum value must be less than 75.';
    }
    return errorMsg;
  });
  return (
    <div id="form-inputs" class="flex flex-col gap-4 pb-24 pt-12">
      <h2 class="text-3xl font-bold">Form Inputs</h2>
      <p class="text-lg">
        This section demonstrates various form inputs and their validation states.
      </p>
      <Show when={clientsQuery.isSuccess}>
        <div class="flex flex-wrap gap-4">
          <SelectInput<ClientRead>
            name="client"
            options={clientsData() ?? []}
            value={selectedClient()}
            onChange={setSelectedClient}
            label="Client"
            description="Select a client from the list."
            required={true}
            optionValue="id"
            optionTextValue="title"
            optionDisabled={(option: ClientRead) => option.is_active === false}
            triggerLabel="Clients"
            placeholder="Select a Client"
            error={selectedClient() === null ? 'This field is required.' : undefined}
          />
          <SelectMultipleInput<ClientRead>
            name="client-multi"
            value={selectedMultiClients()}
            options={clientsData() ?? []}
            onChange={setSelectedMultiClients}
            label="Multiple Clients"
            description="Select multiple clients from the list."
            required={true}
            optionValue="id"
            optionTextValue="title"
            optionDisabled={(option: ClientRead) => option.is_active === false}
            triggerLabel="Clients"
            placeholder="Select a Client"
            error={
              selectedMultiClients() !== undefined &&
              selectedMultiClients()!.length <= 1
                ? 'Select at least two clients.'
                : undefined
            }
          />
          <ComboboxInput<ClientRead>
            name="combobox-client"
            value={comboboxClient()}
            options={clientsData() ?? []}
            onChange={setComboboxClient}
            label="Combobox Client"
            description="Select a client from the combobox list."
            required={true}
            optionValue="id"
            optionTextValue="title"
            optionLabel="title"
            optionDisabled={(option: ClientRead) => option.is_active === false}
            triggerLabel="Clients"
            placeholder="Select a Client"
            error={comboboxClient() === null ? 'This field is required.' : undefined}
          />
          <ComboboxMultiInput<ClientRead>
            name="combobox-client-multiple"
            value={comboboxMultiClients()}
            options={clientsData() ?? []}
            onChange={setComboboxMultiClients}
            label="Combobox Client"
            description="Select a client from the combobox list."
            required={true}
            optionValue="id"
            optionTextValue="title"
            optionLabel="title"
            optionDisabled={(option: ClientRead) => option.is_active === false}
            triggerLabel="Clients"
            placeholder="Select Multiple Clients"
            error={
              comboboxMultiClients() !== undefined &&
              comboboxMultiClients()!.length <= 1
                ? 'Select at least two clients.'
                : undefined
            }
          />
        </div>
      </Show>
      <TextInput
        type="text"
        value={textInput()}
        name={'text-input'}
        label="Text Input"
        placeholder="Enter a text value."
        required={true}
        description="Enter a text value."
        error={textInput() === '' ? 'This field is required.' : undefined}
        onChange={setTextInput}
      />
      <TextInput
        type="textarea"
        value={textareaInput()}
        name={'text-input'}
        label="Textarea Input"
        placeholder="Enter a large text value."
        required={true}
        description="Enter a text value."
        error={textareaInput() === '' ? 'This field is required.' : undefined}
        onChange={setTextareaInput}
      />
      <NumberInput
        value={numberInput()}
        name={'number-input'}
        label="Number Input"
        required={true}
        description="Enter a number value."
        error={numberError()}
        onChange={setNumberInput}
      />
      <CheckboxInput
        value={checkboxInput() ? '1' : '0'}
        checked={checkboxInput()}
        defaultChecked={true}
        name={'checkbox-input'}
        label={checkboxInput() ? 'TRUE' : 'FALSE'}
        required={true}
        error={checkboxInput() === false ? 'This field is required.' : undefined}
        description="Check this box."
        onChange={setCheckboxInput}
      />
      <CheckboxSwitchInput
        value={checkboxSwitchInput() ? '1' : '0'}
        checked={checkboxSwitchInput()}
        defaultChecked={true}
        name={'checkbox-switch-input'}
        label={checkboxSwitchInput() ? 'TRUE' : 'FALSE'}
        required={true}
        error={checkboxSwitchInput() === false ? 'This field is required.' : undefined}
        description="Toggle this switch."
        onChange={setCheckboxSwitchInput}
      />
      <RadioGroupInput
        name="radio-group"
        options={['Apples', 'Bananas', 'Oranges']}
        value={radioInput()}
        defaultValue=""
        label="Radio Group"
        required={true}
        description="Select an option."
        error={radioInputError()}
        onChange={setRadioInput}
      />
      <NumberRangeInput
        name="range-input"
        value={rangeInput()}
        label="Range Input"
        minValue={0}
        maxValue={100}
        step={1}
        minStepsBetweenThumbs={1}
        getValueLabel={(params: SliderGetValueLabelParams) => `# ${params.values[0]}`}
        orientation="horizontal"
        required={true}
        description="Select a value."
        error={rangeInputError()}
        onChange={setRangeInput}
      />
      <NumberRangeInput
        name="range-input-too"
        value={rangeInputToo()}
        label="Range Input Too"
        minValue={0}
        maxValue={100}
        step={1}
        minStepsBetweenThumbs={1}
        getValueLabel={(params: SliderGetValueLabelParams) =>
          `${params.values[0]} - ${params.values[1]}`
        }
        orientation="horizontal"
        required={true}
        description="Select a range."
        error={rangeInputTooError()}
        onChange={setRangeInputToo}
        onChangeEnd={setRangeInputToo}
      />
    </div>
  );
};

export default FormInputsExample;
