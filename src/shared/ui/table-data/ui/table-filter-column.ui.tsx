import { Component, Match, Switch, createSignal, onMount } from 'solid-js';
import { ITableColumnFilterProps } from '~/shared/ui/table-data';

/**
 * @summary TableColumnFilter component for table columns.
 */
export const TableColumnFilter: Component<ITableColumnFilterProps> = (props) => {
  const [firstValue, setFirstValue] = createSignal<any>(null);
  // const [categoryList, setCategoryList] = createSignal<string[]>([]);
  // const [tagsList, setTagsList] = createSignal<string[]>([]);
  // const [tagsInclusive, setTagsInclusive] = createSignal<boolean>(false);
  const columnFilterValue = () => {
    return props.column.getFilterValue();
  };
  const setFilterText = (e: any) => {
    props.setIsFiltering(true);
    return props.column.setFilterValue((old: [string, string]) => {
      return e.target.value;
    });
  };
  const setFilterMin = (e: any) => {
    props.setIsFiltering(true);
    return props.column.setFilterValue((old: [number, number]) => [
      e.target.value,
      old?.[1]
    ]);
  };
  const setFilterMax = (e: any) => {
    props.setIsFiltering(true);
    return props.column.setFilterValue((old: [number, number]) => [
      old?.[0],
      e.target.value
    ]);
  };
  const setFilterBool = (checked: boolean) => {
    props.setIsFiltering(true);
    return props.column.setFilterValue(checked);
  };
  const [filterCheckbox, setFilterCheckbox] = createSignal(false);
  const handleChangeCheckbox = (e: any) => {
    setFilterCheckbox(!filterCheckbox());
    setFilterBool(e.target.checked);
  };
  // const setFilterCategoryIds = (value: string[]) => {
  //   props.setIsFiltering(true);
  //   return props.column.setFilterValue(value);
  // };
  // const setFilterTagIds = (value: any[]) => {
  //   props.setIsFiltering(true);
  //   return props.column.setFilterValue(value);
  // };
  // const handleChangeCategoryList = (e: any) => {
  //   if (e.target.value.includes('ALL') || e.target.value.length === 0) {
  //     setFilterCategoryIds(['ALL']);
  //     setCategoryList([]);
  //   } else {
  //     setCategoryList(e.target.value);
  //     setFilterCategoryIds(categoryList());
  //   }
  // };
  /*
  const handleChangeTagsList = (e: any) => {
    let selected = Array.from(e.target.options as HTMLOptionElement[])
      .filter((v: HTMLOptionElement) => v.selected)
      .map((v: HTMLOptionElement) => v.value);
    if (selected.includes('ALL') || selected.length === 0) {
      setFilterTagIds([tagsInclusive(), ['ALL']]);
      setTagsList([]);
    } else {
      setTagsList(selected);
      setFilterTagIds([tagsInclusive(), tagsList()]);
    }
  };
  const handleChangeTagsInclusive = (e: any) => {
    setTagsInclusive(e.target.checked);
    setFilterTagIds([tagsInclusive(), tagsList()]);
  };
  */
  const handleSetFirstValue = () => {
    setFirstValue(
      props.table.getPreFilteredRowModel().flatRows[0]?.getValue(props.column.id)
    );
  };
  onMount(() => handleSetFirstValue());
  return (
    <Switch>
      <Match when={typeof firstValue() === 'string'}>
        <div class="flex">
          <label class="fw-normal">Search {props.column.id}</label>
          <input
            size="sm"
            type="text"
            value={(columnFilterValue() ?? '') as string}
            onChange={setFilterText}
            style={{ 'min-width': '100px' }}
          />
        </div>
      </Match>
      <Match when={typeof firstValue() === 'number'}>
        <div class="justify-content-between align-items-center flex flex-row flex-nowrap gap-2">
          <div class="w-50 fw-normal">
            <label>Min</label>
            <input
              size="sm"
              type="number"
              value={(columnFilterValue() as [number, number])?.[0] ?? ''}
              onChange={setFilterMin}
            />
          </div>
          <div class="w-50 fw-normal">
            <label>Max</label>
            <input
              size="sm"
              type="number"
              value={(columnFilterValue() as [number, number])?.[1] ?? ''}
              onChange={setFilterMax}
            />
          </div>
        </div>
      </Match>
      <Match when={typeof firstValue() === 'boolean'}>
        <div class="form-group">
          <input
            name="filterCheckbox"
            type="checkbox"
            checked={filterCheckbox()}
            onChange={handleChangeCheckbox}
          />
          <label for="filterCheckbox">Yes/No</label>
        </div>
      </Match>
      {/* <Match when={props.column.id === 'tags'}>
        <Form.Group
          as={Stack}
          direction="horizontal"
          gap={2}
          class="d-flex flex-row flex-nowrap justify-content-between align-items-center"
        >
          <Form.Select
            size="sm"
            multiple
            value={(columnFilterValue() as string[]) ?? []}
            onChange={handleChangeTagsList}
            style={{ 'min-width': '180px' }}
          >
            <option selected={tagsList().length === 0} value="ALL">
              All
            </option>
            <For each={finState.tags?.results}>
              {(tag) => (
                <option selected={tagsList().includes(tag.id) ?? false} value={tag.id}>
                  {tag.name}
                </option>
              )}
            </For>
          </Form.Select>
          <Form.Switch
            label={tagsInclusive() ? 'All' : 'Any'}
            checked={tagsInclusive()}
            onChange={handleChangeTagsInclusive}
          />
        </Form.Group>
      </Match>
      <Match when={props.column.id === 'category'}>
        <Form.Group
          as={Stack}
          direction="horizontal"
          gap={2}
          class="d-flex flex-row flex-nowrap justify-content-between align-items-center"
        >
          <Form.Select
            size="sm"
            multiple
            value={(columnFilterValue() as string[]) ?? []}
            onChange={handleChangeCategoryList}
            style={{ 'min-width': '180px' }}
          >
            <option value="ALL">All</option>
            <Show when={finState.categories.results.length > 0}>
              <For each={finState.categories?.results}>
                {(category) => (
                  <option
                    selected={categoryList().includes(category.id)}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                )}
              </For>
            </Show>
          </Form.Select>
        </Form.Group>
      </Match> */}
    </Switch>
  );
};
