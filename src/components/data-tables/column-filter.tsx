import { Column, Table } from '@tanstack/solid-table';
import { Form } from 'solid-bootstrap';
import {
  Match,
  Switch,
  createEffect,
  createSignal,
  createUniqueId,
  onMount
} from 'solid-js';

/**
 * @summary Filter component for table columns.
 */
export function Filter({
  column,
  table
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const filterId = createUniqueId();
  const [firstValue, setFirstValue] = createSignal<any>(null);
  const columnFilterValue = () => {
    return column.getFilterValue();
  };
  const setFilterText = (e: any) => {
    return column.setFilterValue(e.target.value);
  };
  const setFilterMin = (e: any) => {
    return column.setFilterValue((old: [number, number]) => [e.target.value, old?.[1]]);
  };
  const setFilterMax = (e: any) => {
    return column.setFilterValue((old: [number, number]) => [old?.[0], e.target.value]);
  };
  const setFilterBool = (checked: boolean) => {
    return column.setFilterValue(checked);
  };
  const [filterCheckbox, setFilterCheckbox] = createSignal(false);
  const handleChangeCheckbox = (e: any) => {
    setFilterCheckbox(!filterCheckbox());
    setFilterBool(e.target.checked);
  };
  const handleSetFirstValue = () => {
    setFirstValue(table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id));
  };
  onMount(() => handleSetFirstValue());
  createEffect(() => handleSetFirstValue());
  return (
    <Switch>
      <Match when={typeof firstValue() === 'string'}>
        <Form.Control
          id={`table-filter-text-input-${filterId}`}
          type="text"
          size="sm"
          placeholder="Search..."
          value={(columnFilterValue() ?? '') as string}
          onChange={setFilterText}
        />
      </Match>
      <Match when={typeof firstValue() === 'number'}>
        <Form.Group>
          <Form.Label
            id={`table-filter-number-input-min-label-${filterId}`}
            htmlFor={`table-filter-number-input-min-${filterId}`}
          >
            Min
          </Form.Label>
          <Form.Control
            id={`table-filter-number-input-min-${filterId}`}
            type="number"
            placeholder={`Min`}
            size="sm"
            value={(columnFilterValue() as [number, number])?.[0] ?? ''}
            onChange={setFilterMin}
          />
          <Form.Label
            id={`table-filter-number-input-max-label-${filterId}`}
            htmlFor={`table-filter-number-input-max-${filterId}`}
          >
            Max
          </Form.Label>
          <Form.Control
            id={`table-filter-number-input-max-${filterId}`}
            type="number"
            placeholder={`Max`}
            size="sm"
            value={(columnFilterValue() as [number, number])?.[1] ?? ''}
            onChange={setFilterMax}
          />
        </Form.Group>
      </Match>
      <Match when={typeof firstValue() === 'boolean'}>
        <Form.Group>
          <Form.Label
            id={`table-filter-boolean-checkbox-label-${filterId}`}
            htmlFor={`table-filter-boolean-checkbox-${filterId}`}
            hidden
          >
            Yes/No
          </Form.Label>
          <Form.Check
            type="checkbox"
            id={`table-filter-boolean-checkbox-${filterId}`}
            label="True/False"
            checked={filterCheckbox()}
            onChange={handleChangeCheckbox}
          />
        </Form.Group>
      </Match>
    </Switch>
  );
}
