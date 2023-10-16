/* eslint-disable @typescript-eslint/no-explicit-any */
export const promiseWrapper = (promise: any) => {
  let status = 'pending';
  let result: any;

  const s = promise.then(
    (value: any) => {
      status = 'success';
      result = value;
    },
    (error: any) => {
      status = 'error';
      result = error;
    },
  );

  return () => {
    switch (status) {
      case 'pending':
        throw s;
      case 'success':
        return result;
      case 'error':
        throw result;
      default:
        throw new Error('Unknown status');
    }
  };
};
