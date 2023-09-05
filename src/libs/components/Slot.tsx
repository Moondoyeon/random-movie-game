import { css } from '@emotion/react';
import styled from '@emotion/styled';
import colors from 'libs/style/colors';
import { responsive } from 'libs/style/mixin';
import { SlotOption } from 'libs/types/game';
import { initNum } from 'libs/utils';

import { useEffect, useState } from 'react';

interface Props {
  name: SlotOption;
  option: string[][];
  isSpinning: {
    [key: string]: boolean;
  };
  isFirstEntry: boolean;
  stopSpinning: (name: SlotOption) => void;
  getSelectedOption: (name: SlotOption, num: number) => void;
}
export default function Slot({
  name,
  option,
  isSpinning,
  isFirstEntry,
  stopSpinning,
  getSelectedOption,
}: Props) {
  const n = option.length;
  const addNum = (num: number) => {
    if (num === n - 1) return 0;
    else return num + 1;
  };
  const rotateNum = (num: number) => {
    if (num === -1) return n - 1;
    if (num === n) return 0;
    else return num;
  };
  const [num, setNum] = useState(initNum(n));
  let interval: ReturnType<typeof setInterval>;

  useEffect(() => {
    if (!isFirstEntry && isSpinning[name]) {
      interval = setInterval(() => {
        const nextNum = num;
        setNum(addNum(nextNum));
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [num, isFirstEntry, isSpinning[name]]);

  useEffect(() => {
    if (!isFirstEntry && !isSpinning[name]) {
      clearInterval(interval);
      getSelectedOption(name, num);
    }
  }, [isSpinning[name], num]);

  const handleButtonClick = () => {
    stopSpinning(name);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={css`
          width: 220px;
          height: 280px;
          background-color: ${colors.inverseGrey600};
          display: flex;
          flex-direction: column;
          align-items: center;
          /* box-shadow:; */
          /* rgba(0, 0, 0, 0.2) 0px -50px 36px -28px inset, */
          /* rgba(0, 0, 0, 0.2) 0px 50px 36px -28px inset; */
          ${responsive('phone')} {
            width: 100px;
          }
          ${responsive('tablet')} {
            width: 180px;
          }
        `}
      >
        <SlotCard>{option[rotateNum(num - 1)][0]}</SlotCard>
        <SlotCard>{option[num][0]}</SlotCard>
        <SlotCard>{option[rotateNum(num + 1)][0]}</SlotCard>
      </div>
      <button
        aria-label={name}
        disabled={!isSpinning[name]}
        onClick={handleButtonClick}
        css={css`
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
        `}
      />
    </div>
  );
}

const SlotCard = styled.div`
  padding: 36px 0;
  font-size: 18px;
  color: ${colors.green200};
  ${responsive('phone')} {
    font-size: 16px;
  }
`;
