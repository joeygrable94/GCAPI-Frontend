import { ParentComponent, children } from 'solid-js';

export const TableContent: ParentComponent = (props) => {
  const tableContent = children(() => props.children);
  return (
    <table class="table-sm table-striped table-bordered table-hover table-responsive w-full text-left">
      {tableContent()}
    </table>
  );
};
