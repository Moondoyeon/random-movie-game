import { initNum } from 'libs/utils';
import { HTMLAttributes, useEffect, useState } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
  option: string[][];
  isSpinning: Record<string, boolean>;
  isFirstEntry: boolean;
  getSelectedOption: (name: string, num: number) => void;
}
export default function Slot({
  name,
  option,
  isSpinning,
  isFirstEntry,
  getSelectedOption,
  ...props
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

  // const stopSpin = () => stopSpinning(name);

  return (
    <>
      <div {...props}>{option[rotateNum(num - 1)][0]}</div>
      <div {...props}>{option[num][0]}</div>
      <div {...props}>{option[rotateNum(num + 1)][0]}</div>
    </>
  );
}

// const slotButtonStyle = css`
//   width: 50px;
//   height: 50px;
//   margin-top: 30px;
//   border-radius: 100%;
//   background-color: ${colors.darkRed100};
//   box-shadow: ${colors.darkRed200} 3px 3px 0 0;
//   ${responsive('phone')} {
//     width: 40px;
//     height: 40px;
//   }
//   &:active {
//     box-shadow: ${colors.darkRed200} 2px 2px 0 0;
//     transform: translate(2px, 2px);
//   }
// `;
