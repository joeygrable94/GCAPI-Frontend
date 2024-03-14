export const defaultPagination = <T>(page: number, size: number): T => {
  return {
    total: 0,
    page: page,
    size: size,
    results: []
  } as T;
};
