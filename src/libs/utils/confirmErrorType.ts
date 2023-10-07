interface ErrorInfo {
  response?: { status: number };
  message?: string;
  code?: string;
}
export const isRootError = (error: ErrorInfo) =>
  error.response?.status === 404 ||
  error.response?.status === 408 ||
  (error.response?.status && error.response?.status >= 500) ||
  error.message === '404' ||
  error.message === '408' ||
  error.code === 'ECONNABORTED' ||
  error.code === 'ERR_NETWORK';

export const isTimeOutError = (error: ErrorInfo) =>
  error.response?.status === 408 ||
  error.message === '408' ||
  error.code === 'ECONNABORTED';
export const isNetworkError = (error: ErrorInfo) =>
  error.code === 'ERR_NETWORK';
export const isServerError = (error: ErrorInfo) =>
  error.response?.status === 500;
export const isNotFoundError = (error: ErrorInfo) =>
  error.response?.status === 404 || error.message === '404';
