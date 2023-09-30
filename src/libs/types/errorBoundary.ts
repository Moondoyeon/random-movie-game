/* eslint-disable @typescript-eslint/no-explicit-any */
export type FallbackProps = {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
  onReset?: () => void;
};
