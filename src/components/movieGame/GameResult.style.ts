import { css } from '@emotion/react';
import colors from 'style/colors';

export const gameResult = {
  box: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  movieNm: css`
    font-family: Galmuri11;
    padding: 20px 0px;
    text-align: center;
    width: 90%;
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
