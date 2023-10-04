/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModalDispatchContext } from 'libs/context/ModalContext';
import { TestModals } from 'libs/types/modal';

function useModal() {
  const { open, close } = useModalDispatchContext();

  const openModal = ({ type, props = null }: TestModals) => {
    open({ type, props });
  };

  const closeModal = () => {
    close();
  };

  return { openModal, closeModal };
}

export default useModal;
