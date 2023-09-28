export const isRootError = (status?: number, code?: string, message?: string) =>
  status === 404 ||
  message === '404' ||
  status === 408 ||
  code === 'ECONNABORTED' ||
  (status && status >= 500) ||
  code === 'ERR_NETWORK';
