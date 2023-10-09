/* eslint-disable @typescript-eslint/no-unused-vars */
import { css } from '@emotion/react';
import Button from 'libs/components/@common/Button';
import Modal from 'libs/components/@common/BackDrop';
import colors from 'libs/style/colors';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

// interface AlertModalContextType {
//   showAlert: (message: string) => void;
// }

// export const AlertModalContext = createContext<AlertModalContextType | null>(
//   null,
// );

export const useAlertModalContext = () => {
  return useContext(AlertModalContext);
};

export const AlertModalContext = createContext({
  showAlert(message: string) {},
});

export const AlertModalProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const showAlert = (message: string) => {
    setIsOpen(true);
    setMessage(message);
  };
  const closeAlert = () => {
    setIsOpen(false);
    setMessage('');
  };

  return (
    <AlertModalContext.Provider value={{ showAlert }}>
      {children}
      {isOpen && (
        <Modal whiteBoard>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-around;
              width: 85%;
              height: 200px;
              font-size: 22px;
              font-family: 'Noto Sans KR';
            `}
          >
            {message}
            <Button
              onClick={closeAlert}
              css={css`
                width: 90%;
                padding: 5px 0;
                background-color: ${colors.grey200};
                font-size: 20px;
              `}
            >
              닫기
            </Button>
          </div>
        </Modal>
      )}
    </AlertModalContext.Provider>
  );
};
