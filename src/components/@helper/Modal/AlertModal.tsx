import { css } from '@emotion/react';
import Button from 'components/@common/Button';
import BackDrop from 'components/@common/BackDrop';
import colors from 'style/colors';
import { ModalProps } from 'types/modal';

function AlertModal({ onClose, title, message, btnText = '닫기' }: ModalProps) {
  return (
    <BackDrop whiteBoard>
      <div css={alert.alignColumn} role="dialog" tabIndex={0}>
        <h3 css={alert.title}>{title}</h3>
        <p css={alert.message}>{message}</p>
        <Button onClick={onClose} css={alert.button} aria-label={btnText}>
          {btnText}
        </Button>
      </div>
    </BackDrop>
  );
}

export default AlertModal;

export const alert = {
  alignColumn: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 85%;
    font-family: Galmuri11;
  `,
  title: css`
    font-weight: 700;
    font-size: 22px;
  `,
  message: css`
    margin: 20px 0px;
    font-size: 16px;
  `,
  button: css`
    width: 80px;
    border-radius: 6px;
    padding: 6px 0;
    background-color: ${colors.grey200};
    font-size: 14px;
  `,
};
