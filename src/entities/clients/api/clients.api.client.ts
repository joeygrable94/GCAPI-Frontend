import { QueryFunctionContext } from '@tanstack/solid-query';
import { ClientRead, ClientsService, Paginated_ClientRead_ } from '~/shared/api';
import { defaultPagination } from '~/shared/tanstack';
import { logError } from '~/shared/utils';

/**
 * @summary Fetches a list of clients on the client.
 */
export async function fetchClientsList(
  queryContext: QueryFunctionContext
): Promise<Paginated_ClientRead_> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const page = queryKey[1] as number;
  const size = queryKey[2] as number;
  try {
    const response = await ClientsService.clientsListApiV1ClientsGet({ page, size });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching clients list:', _key, err);
    return defaultPagination<Paginated_ClientRead_>(page, size);
  }
}

/**
 * @summary Fetches a client by ID on the client.
 */
export async function fetchClientById(
  queryContext: QueryFunctionContext
): Promise<ClientRead | undefined> {
  const queryKey = queryContext.queryKey;
  const _key = queryKey[0];
  const clientId = queryKey[1];
  try {
    const response = await ClientsService.clientsReadApiV1ClientsClientIdGet({
      clientId
    });
    return response;
  } catch (err: Error | unknown) {
    logError('Error fetching client:', _key, err);
    return undefined;
  }
}
