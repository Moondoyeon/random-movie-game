import { css } from '@emotion/react';
import Button from 'components/@common/Button';
import BackDrop from 'components/@common/BackDrop';
import Text from 'components/@common/Text';
import colors from 'style/colors';
import { alert } from './AlertModal';
import { ModalProps } from 'types/modal';

function ConfirmModal({
  onClose,
  onSubmit,
  title,
  message,
  btnText,
}: ModalProps) {
  return (
    <BackDrop whiteBoard>
      <div css={alert.alignColumn}>
        <Text typography="h4">{title}</Text>
        <Text typography="p" css={alert.msg}>
          {message}
        </Text>
        <div css={confirm.btnWrapper}>
          <Button onClick={onSubmit} css={confirm.button}>
            {btnText}
          </Button>
          <Button onClick={onClose} css={confirm.button}>
            닫기
          </Button>
        </div>
      </div>
    </BackDrop>
  );
}

export default ConfirmModal;

export const confirm = {
  btnWrapper: css`
    display: flex;
    justify-content: space-around;
    width: 90%;
    margin: 10px 0;
  `,
  button: css`
    width: 100px;
    padding: 5px 0;
    background-color: ${colors.grey200};
    font-size: 20px;
  `,
};
