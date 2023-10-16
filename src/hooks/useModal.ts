import { useModalDispatchContext } from 'context/ModalContext';
import { Modals } from 'types/modal';

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
