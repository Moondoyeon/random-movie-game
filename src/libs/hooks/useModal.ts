/* eslint-disable @typescript-eslint/no-explicit-any */
import { useModalDispatchContext } from 'libs/context/ModalContext';
import { Modals } from 'libs/types/modal';

function useModal() {
  const { open, close } = useModalDispatchContext();

  const showModal = ({ type, props = null }: Modals) => {
    open({ type, props });
  };

  const hideModal = () => {
    close();
  };

  return { showModal, hideModal };
}

export default useModal;
