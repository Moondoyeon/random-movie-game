/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalType = 'alert' | 'confirm';

export interface TestModals {
  type: ModalType;
  props?: any;
}
export interface ModalProps {
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  message?: string;
  btnText?: string;
}
