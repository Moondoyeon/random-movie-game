import { useState } from 'react';

interface Props {
  option: Record<string, string>;
  constants: (string | string[][])[][];
}

function useSlot({ option, constants }: Props) {
  const initial = option;
  const isSpin: Record<string, boolean> = {};
  const keys = Object.keys(option);
  keys.forEach(key => (isSpin[key] = false));

  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [selected, setSelected] = useState(option);
  const [isSpinning, setIsSpinning] = useState(isSpin);

  const startSpinning = () => {
    setIsFirstEntry(false);
    keys.forEach(key => (isSpin[key] = true));
    setIsSpinning(isSpin);
  };

  const stopSpinning = (name: string) => () => {
    setIsSpinning(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  const getSelectedOption = (name: string, num: number) => {
    const selectedCon = constants.filter(con => {
      if (con[0] === name) return con[1];
    })[0][1];

    setSelected(prev => ({
      ...prev,
      [name]: selectedCon[num][1],
    }));
  };

  const initEntryAndSelection = () => {
    setIsFirstEntry(true);
    setSelected(initial);
  };
  return {
    isFirstEntry,
    selected,
    isSpinning,
    getSelectedOption,
    stopSpinning,
    startSpinning,
    initEntryAndSelection,
  };
}
export default useSlot;
