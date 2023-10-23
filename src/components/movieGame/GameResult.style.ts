import { css } from '@emotion/react';
import colors from 'style/colors';
import { responsive } from 'style/mixin';

export const gameResult = {
  box: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .result {
      font-size: 20px;
      ${responsive('phone')} {
        font-size: 16px;
      }
    }
  `,
  movieNm: css`
    font-family: Galmuri11;
    padding: 20px 10px;
    margin: 10px 0;
    text-align: center;
    width: 90%;
    word-wrap: break-word;
    font-size: 30px;
    color: ${colors.green200};
    background-color: ${colors.inverseGrey200};
    ${responsive('phone')} {
      font-size: 22px;
    }
  `,
  bottom: css`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  initButton: css`
    background-color: ${colors.inverseGrey800};
    padding: 10px 16px;
    border-radius: 6px;
  `,
};
