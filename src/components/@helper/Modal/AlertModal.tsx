import { css } from '@emotion/react';
import Button from 'components/@common/Button';
import BackDrop from 'components/@common/BackDrop';
import Text from 'components/@common/Text';
import colors from 'style/colors';
import { ModalProps } from 'types/modal';

function AlertModal({ onClose, title, message, btnText = '닫기' }: ModalProps) {
  return (
    <BackDrop whiteBoard>
      <div css={alert.alignColumn} role="dialog" tabIndex={0}>
        <Text typography="h4">{title}</Text>
        <Text typography="p" css={alert.msg}>
          {message}
        </Text>
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
    width: 450px;
  `,
  msg: css`
    font-family: Galmuri11;
    margin: 20px 0px;
    font-size: 18px;
  `,
  button: css`
    width: 85%;
    padding: 5px 0;
    background-color: ${colors.grey200};
    font-size: 16px;
  `,
};
