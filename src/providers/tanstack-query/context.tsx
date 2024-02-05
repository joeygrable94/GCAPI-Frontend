import { QueryClientProvider } from '@tanstack/solid-query';
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools';
import { ParentComponent } from 'solid-js';
import { queryClient } from '~/shared/lib/tanstack-query';

type QueryProviderProps = {};

const QueryProvider: ParentComponent<QueryProviderProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
      <SolidQueryDevtools />
    </QueryClientProvider>
  );
};

export default QueryProvider;
