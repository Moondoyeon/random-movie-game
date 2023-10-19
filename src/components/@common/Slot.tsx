import { HTMLAttributes, useEffect, useState } from 'react';
import { initNum } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  name: string;
  option: Record<string, string>;
  isSpinning: Record<string, boolean>;
  isFirstEntry: boolean;
  getSelectedOption: (name: string, num: number) => void;
}
function Slot({
  name,
  option,
  isSpinning,
  isFirstEntry,
  getSelectedOption,
  ...props
}: Props) {
  const ArrayedOption = Object.entries(option);
  const len = ArrayedOption.length;
  const addNum = (num: number) => {
    if (num === len - 1) return 0;
    else return num + 1;
  };
  const rotateNum = (num: number) => {
    if (num === -1) return len - 1;
    if (num === len) return 0;
    else return num;
  };
  const [num, setNum] = useState(initNum(len));
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

  return (
    <>
      <div {...props}>{ArrayedOption[rotateNum(num - 1)][1]}</div>
      <div {...props}>{ArrayedOption[num][1]}</div>
      <div {...props}>{ArrayedOption[rotateNum(num + 1)][1]}</div>
    </>
  );
}
export default Slot;
