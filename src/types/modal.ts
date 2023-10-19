/* eslint-disable @typescript-eslint/no-explicit-any */
export type ModalType = 'alert' | 'confirm';

export interface Modals {
  type: ModalType;
  props?: any;
  id?: string;
}
export interface ModalProps {
  onClose: () => void;
  onSubmit?: () => void;
  title?: string;
  message?: string;
  btnText?: string;
}
