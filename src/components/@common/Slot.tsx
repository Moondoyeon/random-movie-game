import { HTMLAttributes, useEffect, useState } from 'react';
import { addNum, initNum, rotateNum } from 'utils';

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
  const ArrayedSlotOption = Object.entries(option);
  const len = ArrayedSlotOption.length;
  const [num, setNum] = useState(initNum(len));
  let interval: ReturnType<typeof setInterval>;

  useEffect(() => {
    if (!isFirstEntry && isSpinning[name]) {
      interval = setInterval(() => {
        const nextNum = num;
        setNum(addNum(nextNum, len));
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
      <div {...props}>{ArrayedSlotOption[rotateNum(num - 1, len)][1]}</div>
      <div {...props}>{ArrayedSlotOption[num][1]}</div>
      <div {...props}>{ArrayedSlotOption[rotateNum(num + 1, len)][1]}</div>
    </>
  );
}
export default Slot;
