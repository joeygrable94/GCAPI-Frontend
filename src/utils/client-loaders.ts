/**
 * @summary Loads initial data into the client from the server
 *
 * @param value a PaginatedResource object or undefined
 * @returns a PaginatedResource object of the input type
 */
export function loadInitialData<T>(value: T | undefined): T {
  if (value !== undefined) {
    return value as T;
  } else {
    return {
      total: 0,
      page: 0,
      size: 0,
      results: []
    } as T;
  }
}
