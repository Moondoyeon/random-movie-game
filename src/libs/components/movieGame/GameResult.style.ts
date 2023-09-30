import { css } from '@emotion/react';
import colors from 'libs/style/colors';

export const gameResult = {
  box: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  movieNm: css`
    padding: 20px;
    text-align: center;
    width: 100%;
    word-wrap: break-word;
  `,
  bottom: css`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  initButton: css`
    background-color: ${colors.grey200};
    padding: 10px 16px;
    border-radius: 6px;
  `,
};
