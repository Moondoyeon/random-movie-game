import { createPortal } from 'react-dom';
import { Modals } from 'types/modal';
import { useModalContext } from 'context/ModalContext';
import useModal from 'hooks/useModal';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';

const MODAL_COMPONENTS = {
  alert: AlertModal,
  confirm: ConfirmModal,
};

function CreatePortal() {
  const openedModals = useModalContext();
  const { hideModal } = useModal();
  let modalElement;

  const renderModal = openedModals.map(({ type, props, id }: Modals) => {
    const ModalComponent = type && MODAL_COMPONENTS[type];
    const { onSubmit, onClose, ...restProps } = props;
    modalElement = document.getElementById(`${type}-modal`);

    const handleSubmit = async () => {
      if (typeof onSubmit === 'function') await onSubmit();
      // hideModal();
    };

    const handleClick = () => {
      onClose && onClose();
      hideModal();
    };

    return (
      <ModalComponent
        key={id}
        {...restProps}
        onClose={handleClick}
        onSubmit={handleSubmit}
      />
    );
  });

  if (process.env.NODE_ENV === 'test') return renderModal;
  else return modalElement && createPortal(renderModal, modalElement);
}

export default CreatePortal;
