import { createPortal } from 'react-dom';
import { TestModals } from 'libs/types/modal';
import { useModalContext } from 'libs/context/ModalContext';
import useModal from 'libs/hooks/useModal';
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

  const renderModal = openedModals.map(({ type, props, id }: TestModals) => {
    const ModalComponent = type && MODAL_COMPONENTS[type];
    const { onSubmit, ...restProps } = props;
    modalElement = document.getElementById(`${type}-modal`);

    const handleSubmit = async () => {
      if (typeof onSubmit === 'function') await onSubmit();
      // hideModal();
    };

    return (
      <ModalComponent
        key={id}
        {...restProps}
        onClose={hideModal}
        onSubmit={handleSubmit}
      />
    );
  });

  if (modalElement) return createPortal(renderModal, modalElement);
}

export default CreatePortal;
