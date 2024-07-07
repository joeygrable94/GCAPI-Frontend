import { ParentComponent, children } from 'solid-js';

export const TableContent: ParentComponent = (props) => {
  const tableContent = children(() => props.children);
  return <table class="w-full table-auto text-left">{tableContent()}</table>;
};
