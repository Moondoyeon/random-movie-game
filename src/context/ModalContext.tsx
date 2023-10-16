/* eslint-disable @typescript-eslint/no-unused-vars */
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import CreatePortal from 'components/@helper/Modal/CreatePortal';
import { Modals } from 'types/modal';

export const ModalContext = createContext<Modals[]>([]);
export const ModalDispatchContext = createContext({
  open: ({ type, props }: Modals) => {},
  close: () => {},
});

export const useModalContext = () => useContext(ModalContext);
export const useModalDispatchContext = () => useContext(ModalDispatchContext);

function ModalProvider({ children }: { children: ReactNode }) {
  const [openedModals, setOpenedModals] = useState<Modals[]>([]);

  const open = ({ type, props }: Modals) => {
    const KEY = Math.random().toString(36).substring(2);
    setOpenedModals(modals => {
      return [
        ...modals,
        {
          type,
          props,
          id: `${type}${KEY}`,
        },
      ];
    });
  };
  const close = () => {
    setOpenedModals(modals => {
      return modals.slice(0, modals.length - 1);
    });
  };

  const dispatch = useMemo(() => ({ open, close }), []);

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalContext.Provider value={openedModals}>
        {children}
        <CreatePortal />
      </ModalContext.Provider>
    </ModalDispatchContext.Provider>
  );
}

export default ModalProvider;
