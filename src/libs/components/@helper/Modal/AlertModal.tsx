import { css } from '@emotion/react';
import Button from 'libs/components/@common/Button';
import BackDrop from 'libs/components/@common/BackDrop';
import colors from 'libs/style/colors';
import Text from 'libs/components/@common/Text';
import { ModalProps } from 'libs/types/modal';

function AlertModal({ onClose, title, message, btnText = '닫기' }: ModalProps) {
  return (
    <BackDrop whiteBoard>
      <div css={alert.alignColumn}>
        <Text typography="h4">{title}</Text>
        <Text typography="p" css={alert.msg}>
          {message}
        </Text>
        <Button onClick={onClose} css={alert.button}>
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
    margin: 20px 0px;
    font-size: 20px;
  `,
  button: css`
    width: 100%;
    padding: 5px 0;
    background-color: ${colors.grey200};
    font-size: 20px;
  `,
};
