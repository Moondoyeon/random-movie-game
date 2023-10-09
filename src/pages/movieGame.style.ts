import { css } from '@emotion/react';
import colors from 'libs/style/colors';
import { responsive } from 'libs/style/mixin';

export const startButton = css`
  font-family: Galmuri11;
  letter-spacing: 30px;
  cursor: pointer;
  color: ${colors.white};
  font-size: 65px;
  font-weight: 700;
  ${responsive('phone')} {
    font-size: 40px;
  }
`;

export const slot = {
  container: css`
    display: flex;
    justify-content: space-around;
    width: 960px;
    height: 520px;
    background-color: ${colors.inverseGrey800};
    margin: 40px 0;
    padding: 0 36px;
    border-radius: 10px;
    ${responsive('phone')} {
      width: 330px;
      padding: 0 30px;
    }
    ${responsive('tablet')} {
      width: 700px;
    }
  `,
  flexColumn: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  spinningSquare: css`
    width: 240px;
    height: 280px;
    background-color: ${colors.inverseGrey600};
    display: flex;
    flex-direction: column;
    align-items: center;
    ${responsive('phone')} {
      width: 80px;
    }
    ${responsive('tablet')} {
      width: 180px;
    }
  `,
  spinningText: css`
    padding: 36px 0;
    font-size: 18px;
    color: ${colors.green200};
    ${responsive('phone')} {
      font-size: 14px;
    }
  `,
  button: css`
    width: 50px;
    height: 50px;
    margin-top: 30px;
    border-radius: 100%;
    background-color: ${colors.darkRed100};
    box-shadow: ${colors.darkRed200} 3px 3px 0 0;
    ${responsive('phone')} {
      width: 40px;
      height: 40px;
    }
    &:active {
      box-shadow: ${colors.darkRed200} 2px 2px 0 0;
      transform: translate(2px, 2px);
    }
  `,
};
